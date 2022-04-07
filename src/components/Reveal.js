import React, { Component, useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Web3 from "web3";
import { ethers } from "ethers";
import contract from "../contracts/contract.json";
import Hero from "../assets/hero.png";
import Logo from "../assets/logo.png";

export default class animatedbasic extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }
}

export default Reveal;
