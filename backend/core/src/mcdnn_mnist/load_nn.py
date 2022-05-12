from keras.models import model_from_json 
def load_last(folder='mcdnn_mnist'):
    json_file = open(f'core/src/{folder}/model.json','r')
    loaded_model_json = json_file.read()
    json_file.close()

    loaded_model = model_from_json(loaded_model_json)

    loaded_model.load_weights(f'core/src/{folder}/model.h5')
    print("Loaded Model from disk")
    loaded_model.compile(loss='categorical_crossentropy',optimizer='adam',metrics=['accuracy'])
    return loaded_model
