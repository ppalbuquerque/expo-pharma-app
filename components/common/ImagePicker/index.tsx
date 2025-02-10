import { useState } from 'react'
import { View } from 'react-native'
import * as ImagePickerExpo from 'expo-image-picker'
import { Image } from 'expo-image'

import Button from '../Button'

export default function ImagePicker() {
    const [image, setImage] = useState<string>("")

    const handlePickImage = async () => {
        const result = await ImagePickerExpo.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    return (
        <View>
            <Button onPress={handlePickImage}>
                Pick Image
                {image && <Image source={image} />}
            </Button>
        </View>
    )
}