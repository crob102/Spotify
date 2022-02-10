import {StyleSheet, View, Text, Image} from "react-native";
import React, { useState } from 'react';
import Colors from './Themes/colors.js';


export default function Song({id, name, artist, cover, duration, album, url}) {
    return (
         <View style={styles.songbox}>
            <View style={styles.id}> 
                <Text style={[styles.text]}>{id+1} </Text>
            </View>

            <View style={styles.preview}>
                <Image style={styles.image} source={{uri: String(url)}}> </Image> 
            </View> 

            <View style={styles.name}>
                <Text numberOfLines={1} style={{color: Colors.white}}>{name}</Text>
                <Text numberOfLines={1} style={{color: Colors.gray}}>{artist}</Text>
            </View>

            <View style={styles.album}>
                <Text numberOfLines={1} style={{color: Colors.white}}>{album}</Text>
            </View>

            <View style={styles.duration}>
                <Text numberOfLines={1} style={[color: Colors.white, styles.duration]}>{duration}</Text>
            </View>
            
        </View>

    );
}

const styles = StyleSheet.create({
    songbox: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
        width: 385,
        height: 105,
        padding: 5,
        margin: 5,
        color: Colors.white,

    }, 

    name: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '24%',
        margin: 5,
    },


  text: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "700",
  },

  id: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '7%',
  },

  preview: {
    width: '22%',
    marginRight: 7,
    marginBottom: 5,
  },

  image: {
    width: 75,
    height: 75,
  },

  artist: {
    width: '35%',
    justifyContent: 'center',
    marginRight: 10,
  },

  album: {
    width: '28%',
    marginRight: 10,
    justifyContent: 'center',
  },

  duration: {
    alignContent: 'center',
    width: '25%',
    justifyContent: 'center',
  },

});