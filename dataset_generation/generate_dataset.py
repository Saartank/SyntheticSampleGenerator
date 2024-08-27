from config import Config
import os
import cv2
from data_generator import create_cells_image_and_labels, random_parameters

def generate_and_save_samples():
    os.makedirs(os.path.join(Config.DATASET_DIR, "inputs"), exist_ok=True)
    os.makedirs(os.path.join(Config.DATASET_DIR, "labels"), exist_ok=True)

    for i in range(Config.NUM_IMAGES):
        params = random_parameters()
        input_image, label_image = create_cells_image_and_labels(*params)
        
        file_name = f'sample_{i}.png'

        input_path = os.path.join(Config.DATASET_DIR, "inputs", file_name)
        label_path = os.path.join(Config.DATASET_DIR, "labels", file_name)

        cv2.imwrite(input_path, input_image)
        cv2.imwrite(label_path, label_image)

        print(f'Saved {input_path} and {label_path}')


if __name__ == "__main__":
    generate_and_save_samples()