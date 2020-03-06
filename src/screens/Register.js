import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-elements";
import { connect } from "react-redux";

import { signup } from "../actions/AuthActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    avatar:
      "https://cdn4.iconfinder.com/data/icons/universal-web-mobile-1-6/65/33-512.png"
  };

  onChooseImagePress = async () => {
    //let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      console.log(result);
      this.setState({ avatar: result.uri });
    }
  };

  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
    console.log(this.state.avatar);
  };

  onSignup() {
    console.log(this.props.loading);
    const { name, email, password, avatar } = this.state;
    this.props.signup({ name, email, password, avatar });
    console.log(this.props.error);
  }

  showErrorMessage() {
    if (this.props.error) {
      return (
        <View>
          <Text style={{ color: "red", fontSize: 12, marginBottom: 15 }}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            size="large"
            rounded
            source={{ uri: this.state.avatar }}
            onPress={this.onChooseImagePress}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require("../img/name.png")} />
          <TextInput
            style={styles.inputs}
            placeholder="Name"
            underlineColorAndroid="transparent"
            onChangeText={name => this.setState({ name })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../img/email.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../img/password.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
          />
        </View>
        {this.showErrorMessage()}

        {this.props.loading ? (
          <Button loading type="clear" />
        ) : (
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.onSignup.bind(this)}
          >
            <Text style={styles.loginText}>Register</Text>
          </TouchableHighlight>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#DCDCDC"
  },
  avatarContainer: {
    marginTop: 40,
    marginBottom: 30
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  }
});

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    signedup: state.auth.signedup
  };
};

export default connect(mapStateToProps, { signup })(Register);
