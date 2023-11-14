import React from "react";
import {Text,FlatList,View} from "react-native"

export default function LoadingText(){
	return(
		<>
            <View >
                <Text>
                    LOADING...
                </Text>
                <Text>
                    If you don't see anything in a few seconds...
                </Text>
                <FlatList
                    data={[
                        "1. There may not be any markers near this location. In this case, you can create one by going to the Menu and selecting 'Create New Location'",
                        "2. Check your internet connection", 
                        "3. Refresh the page", 
                        "4. Consider adding or changing relays by selecting 'Relay Management' in the Menu",
                    ]}
                    renderItem={({item, index}) => <Text key={index} >{item}</Text>}
                />

            </View>
		</>
	)
}