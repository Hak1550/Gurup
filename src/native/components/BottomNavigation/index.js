import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const BottomNavigation = ({active, rectangleBorder = false, ...rest}) => {
	if(rectangleBorder) {
		return (
		  <View style={styles['bottom-navigation-rectangle']}>
			  <TouchableOpacity style={styles['bottom-navigation__tab']}>
				  <FontAwesome style={styles['bottom-navigation__tab-icon']} name={"list"}/>
				  <Text style={styles['bottom-navigation__tab-text']}>tab</Text>
			  </TouchableOpacity>
			  <TouchableOpacity style={styles['bottom-navigation__tab']}>
				  <FontAwesome style={styles['bottom-navigation__tab-icon-active']} name={"commenting-o"}/>
				  <Text style={styles['bottom-navigation__tab-text-active']}>Chats</Text>
			  </TouchableOpacity>
			  <TouchableOpacity style={styles['bottom-navigation__tab']}>
				  <FontAwesome style={styles['bottom-navigation__tab-icon']} name={"ellipsis-h"}/>
				  <Text style={styles['bottom-navigation__tab-text']}>Menu</Text>
			  </TouchableOpacity>
		  </View>
		)
	} else {
		return(
		  <View style={styles['bottom-navigation']}>
			  <TouchableOpacity style={styles['bottom-navigation__tab']}>
				  <FontAwesome style={styles['bottom-navigation__tab-icon']} name={"list"}/>
				  <Text style={styles['bottom-navigation__tab-text']}>tab</Text>
			  </TouchableOpacity>
			  <TouchableOpacity style={styles['bottom-navigation__tab']}>
				  <FontAwesome style={styles['bottom-navigation__tab-icon-active']} name={"commenting-o"}/>
				  <Text style={styles['bottom-navigation__tab-text-active']}>Chats</Text>
			  </TouchableOpacity>
			  <TouchableOpacity style={styles['bottom-navigation__tab']}>
				  <FontAwesome style={styles['bottom-navigation__tab-icon']} name={"ellipsis-h"}/>
				  <Text style={styles['bottom-navigation__tab-text']}>Menu</Text>
			  </TouchableOpacity>
		  </View>
		  )
	}
}


export default BottomNavigation
