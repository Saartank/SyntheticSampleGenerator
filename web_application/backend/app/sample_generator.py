import numpy as np
import cv2
import random

def create_cells_image_and_labels(num_cells, image_size, avg_diameter, noise_level=0.1, blur_level=0.5, deformation_factor=0.2, roughness_factor=2, fluorescence_level=0.5):
    """
    Generate an image of cells in uint16 with corresponding labeled masks in uint8 
    based on the given set of parameters.
    """
    image = np.zeros((image_size, image_size), dtype=np.uint16)
    label_image = np.zeros((image_size, image_size), dtype=np.uint8)

    max_roughness = ((roughness_factor/avg_diameter) * image_size)/2

    for cell_id in range(1, num_cells + 1):
        center_x = random.randint(0, image_size)
        center_y = random.randint(0, image_size)
        
        axis_x = random.uniform(1 - deformation_factor, 1 + deformation_factor) * avg_diameter / 2
        axis_y = random.uniform(1 - deformation_factor, 1 + deformation_factor) * avg_diameter / 2
        
        angle = random.uniform(0, 360)
        
        ellipse_mask = np.zeros_like(image, dtype=np.uint8)
        cv2.ellipse(ellipse_mask, 
                    (center_x, center_y), 
                    (int(axis_x), int(axis_y)), 
                    angle, 
                    0, 
                    360, 
                    255, 
                    thickness=-1)

        contours, _ = cv2.findContours(ellipse_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        for contour in contours:
            for point in contour:
                point[0][0] += random.uniform(0, max_roughness)
                point[0][1] += random.uniform(0, max_roughness)


            cell_fluorescence = int(np.clip(np.round(np.random.normal(fluorescence_level * 65535, 0.5 * 65535)), 15000, 65535))
            cv2.drawContours(image, [np.round(contour).astype(np.int32)], -1, cell_fluorescence, thickness=-1)
            cv2.drawContours(label_image, [np.round(contour).astype(np.int32)], -1, cell_id, thickness=-1)
    
    noise = np.random.randint(0, int(65535 * noise_level), (image_size, image_size), dtype=np.uint16)
    image = cv2.add(image, noise)

    min_blur_kernel = 1
    max_blur_kernel = avg_diameter/3
    kernel_size = int(blur_level * (max_blur_kernel - min_blur_kernel) + min_blur_kernel) | 1

    image = cv2.GaussianBlur(image, (kernel_size, kernel_size), 0)

    return image, label_image


def display_image_in_yellow_scale(image):
    '''
    Convert the grayscale image to a yellow-scale image.
    '''
    bgr_image = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)
    
    bgr_image[:, :, 0] = 0 
    bgr_image[:, :, 2] = bgr_image[:, :, 1]
    
    return bgr_image

def colorize_label_image(label_image, num_cells):
    '''
    Apply a color map to the labeled image for visualization.
    '''
    normalized_label_image = np.uint8(255 * (label_image / num_cells))
    
    colored_label_image = cv2.applyColorMap(normalized_label_image, cv2.COLORMAP_JET)
    
    return colored_label_image