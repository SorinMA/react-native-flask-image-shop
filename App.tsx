import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';

export default function App() {
  const [images, setImages] = useState([]);
  const [imagesLoaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("http://192.168.0.33:5000/get-images")
      .then((response) => {
        setImages(response.data.allImages);
        setLoaded(response.data.images);
      })
      .catch((error) => console.error(error));
  }, []);

  const renderLogo = () => {
    let images_to_show = null;
    if (imagesLoaded === true) {
      images_to_show = (Array.from(images))
                             .map((data,i) => {
                              return <Image key = {i} 
                                            source = {{uri: `data:image/png;base64,${data}`}}
                                            style={styles.logo}
                                            resizeMode={'cover'}/>;
                             });                
    }

    return images_to_show;
  }
  return (
    <>
      <View style={styles.container}>
        {renderLogo()}
        <Image style={styles.logo} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"}} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  logo: {
    width: 250,
    height: 200,
  },
});

