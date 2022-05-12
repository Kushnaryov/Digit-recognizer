import base64
from PIL import Image, ImageOps
import io
import numpy as np

def decode_image(base64_png_data):
    image_b64 = base64_png_data.split(",")[1]
    # decode
    binary = base64.b64decode(image_b64)
    image = Image.open(io.BytesIO(binary))
    if image.mode == 'RGBA':
        r,g,b,a = image.split()
        image = Image.merge('RGB', (r,g,b))
        image = ImageOps.invert(image)
    
    return np.asarray(image)

def crop_image(np_image):

    def find_image_borders(image):
        padding=100
        top = 0
        bottom = image.shape[0]-1
        left = 0
        right = image.shape[1]-1
        while len(np.unique(image[top])) == 1:
            top += 1
        while len(np.unique(image[bottom])) == 1:
            bottom -= 1
        while len(np.unique(image[:, left])) == 1:
            left += 1
        while len(np.unique(image[:, right])) == 1:
            right -= 1
        return top-padding, bottom+padding, left-padding, right+padding

    top, bottom, left, right = find_image_borders(np_image)
    cropped_image = np_image[top:bottom, left:right]
    return cropped_image

def resize_image(image, new_size=(28,28)):
    image = Image.fromarray(image)
    image = np.array(image.resize(new_size))
    image = image.sum(axis=2).reshape(1, 28, 28, 1)
    return image

def normalize_image(image):
    return image.astype('float32')/255.0

def save_image(image, name):
    if image.shape == (1, 28, 28, 1):
        image.reshape(28, 28, 1)
    image = Image.fromarray(image)
    image.save(f'{name}.png')