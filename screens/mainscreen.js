import { StyleSheet, Text, SafeAreaView, View, Image, FlatList, Scrollview, Pressable} from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from './Themes/colors';
import Song from './Song.js';
import millisToMinutesAndSeconds from './utils/millisToMinuteSeconds';

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function MainScreen() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      // Comment out the one you are not using
      // myTopTracks(setTracks, token);
      albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);

    const renderAlbumList = (item) => {
    return(
      <Song 
        name={item.name}
        artists={item.artists[0].name}
        id={item.index}
        album={item.album.name}
        url={item.album.images[0].url}
        duration={millisToMinutesAndSeconds(item.item.duration)}
      />
    )
  }

  const Home = () => {
    return(
      <View>
        <Pressable 
          style={styles.homescreen} onPress={()=>{promptAsync()}}>
          <View style={styles.button}>
            <Image style={styles.small} source={require('./assets/spotify-logo.png')}/>
            <Text style={styles.text}>
              Connect With Spotify!
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }   

  const List = () => {
    return(
      <View>
        <View style={styles.albums}>
          <Text style={{fontSize: 24}, {fontWeight: 'bold'}, {color: Colors.white}, {margin: 12}}> 
            Album Tracks
          </Text>
        </View>
        <View>
          <FlatList
            data={tracks}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

    );
  }

  let screen = null;

  if (token) {
    screen = <List/>

  } else {
    screen = <Home/>
  }

  return (
    <SafeAreaView style={styles.container}>
      {screen}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },

  homescreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Spotify,
    borderRadius: 99999,
    flexDirection: 'row',
    padding: 6,

  },

  button: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 2,
  },

  small: {
    height: 15,
    width: 15,
    backgroundColor: Colors.Spotify,
    borderRadius: 99999,
  },

  text: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: "#ffffff", 
    margin: 12,
  },

  albums: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
