import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title,
} from "native-base";
export default class CardImageExample extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>About</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <CardItem cardBody>
              <Image
                resizeMode="contain"
                source={{
                  uri:
                    "https://avatars3.githubusercontent.com/u/45595749?s=460&v=4",
                }}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
            <CardItem>
              <Body style={{ alignItems: "center" }}>
                <Text>Abhishek Kumar Gupta </Text>
                <Text>Github : satyam52 </Text>
                <Text>Email : Gsatyam52@gmail.com</Text>
                <Text style={{ marginTop: 7, marginLeft: 10 }} note>
                  Description : This is the Basic App that will let you check
                  current status of COVID-19 cases.This app was build solely for
                  learning purpose.
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
