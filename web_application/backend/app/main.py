from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from io import BytesIO
import cv2
from app.sample_generator import create_cells_image_and_labels, display_image_in_yellow_scale, colorize_label_image
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from app.s3_utils import upload_file_to_s3
import uuid
from .logging_config import logger

logger.info("Initializing FastAPI app!")

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate_sample")
async def generate_sample_endpoint(
    num_cells: int = Query(30),
    image_size: int = Query(512),
    avg_diameter: int = Query(45),
    noise_level: float = Query(0.1),
    blur_level: float = Query(0.5),
    deformation_factor: float = Query(0.3),
    roughness_factor: float = Query(1.0),
    fluorescence_level: float = Query(0.5)
):
    
    '''
    Endpoint to generate a sample cell image and upload the results to S3, returning the image URLs.
    '''
    
    image, label_image = create_cells_image_and_labels(num_cells, image_size, avg_diameter, 
                                                       noise_level, blur_level, deformation_factor, 
                                                       roughness_factor, fluorescence_level)

    yellow_image = display_image_in_yellow_scale(image)
    
    colored_label_image = colorize_label_image(label_image, num_cells)
    
    yellow_image_bytes = BytesIO()
    colored_label_image_bytes = BytesIO()

    _, yellow_image_png = cv2.imencode('.png', yellow_image)
    _, colored_label_image_png = cv2.imencode('.png', colored_label_image)

    yellow_image_bytes.write(yellow_image_png.tobytes())
    colored_label_image_bytes.write(colored_label_image_png.tobytes())

    yellow_image_bytes.seek(0)
    colored_label_image_bytes.seek(0)

    yellow_image_filename = f"cells_image_yellow_{uuid.uuid4()}.png"
    colored_label_image_filename = f"label_image_colored_{uuid.uuid4()}.png"

    yellow_image_url = upload_file_to_s3(yellow_image_bytes, yellow_image_filename, "image/png")
    colored_label_image_url = upload_file_to_s3(colored_label_image_bytes, colored_label_image_filename, "image/png")

    return {
        "cell_sample_yellow_url": yellow_image_url,
        "label_image_colored_url": colored_label_image_url
    }


@app.get("/", summary="Health Check", description="Returns the status of the API along with the current date and time.")
def read_root():
    current_time = datetime.utcnow().isoformat()
    return {
        "status": "ok",
        "message": "API is healthy",
        "timestamp": current_time
    }