from flask import jsonify, Blueprint, request, json
from core.config import Config
from core.src.helpers import decode_image, crop_image, resize_image, normalize_image

routes_bp = Blueprint('routes', __name__)

model = Config.MODEL

@routes_bp.route("/predict",methods=["GET", "POST"])
def predict():
    
    data = json.loads(request.data)
    image = decode_image(data)
    cropped_image = crop_image(image)
    resized_image = resize_image(cropped_image)
    norm_image = normalize_image(resized_image)
    print(cropped_image.shape)
    predicted = model.predict(norm_image)[0]
    font_size = []
    for i, j in enumerate(predicted):
        font_size.append(f'{20 + j*30}px')
    res = jsonify({'predicted': predicted.tolist(),
                    'font_size': font_size})
    return res


@routes_bp.route("/test")
def test():
    return jsonify({'test':'Test is ok'})