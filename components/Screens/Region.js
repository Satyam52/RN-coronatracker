import React, { Component, useEffect, useState } from "react";
import { Ionicons as Icon } from "@expo/vector-icons";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  Left,
  Right,
  Body,
  Title,
  CardItem,
  Card,
  H3,
  Text,
} from "native-base";
import AnimateNumber from "react-native-countup";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { countries, fetchData } from "../api/index";

const Region = () => {
  const [Country, setCountry] = useState([]);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const secountry = async () => {
      setCountry(await countries());
    };
    const fetchAPI = async (selected) => {
      const res = await fetchData(selected);
      setData(res);
    };
    secountry();
    if (selected) {
      fetchAPI(selected);
    }
  }, [setCountry, selected]);

  const onValueChange = (value) => {
    setSelected(value);
  };

  const { width } = Dimensions.get("window");
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Regional</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form style={{ padding: 10 }}>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ width: undefined }}
              placeholder="Country"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={selected}
              onValueChange={(value) => onValueChange(value)}
            >
              <Picker.Item label="Country" value="" />
              {Country &&
                Country.map((name, i) => (
                  <Picker.Item key={i} label={name} value={name} />
                ))}
            </Picker>
          </Item>
        </Form>
        {selected && data.confirmed ? (
          <>
            <Card>
              <CardItem header>
                <H3 style={{ color: "blue" }}>Currently Active Cases</H3>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    <AnimateNumber
                      initial={0}
                      value={data.confirmed}
                      timing="easeOut"
                      formatter={(val) => {
                        return +parseFloat(val).toFixed(0);
                      }}
                    />
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>
                  {" "}
                  Last Updated : {new Date(data.lastUpdate).toDateString()}
                </Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <H3 style={{ color: "green" }}>Recoveries </H3>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    <AnimateNumber
                      initial={0}
                      value={data.recovered}
                      timing="easeOut"
                      formatter={(val) => {
                        return +parseFloat(val).toFixed(0);
                      }}
                    />
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>
                  Last Updated : {new Date(data.lastUpdate).toDateString()}
                </Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <H3 style={{ color: "red" }}>Deaths</H3>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    <AnimateNumber
                      initial={0}
                      value={data.deaths}
                      timing="easeOut"
                      formatter={(val) => {
                        return +parseFloat(val).toFixed(0);
                      }}
                    />
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>
                  Last Updated :{new Date(data.lastUpdate).toDateString()}
                </Text>
              </CardItem>
            </Card>
            <BarChart
              style={{
                marginVertical: 8,
                backgroundColor: "#333fff",
                borderRadius: 4,
              }}
              data={{
                labels: ["Infected", "Recovered", "Deaths"],
                datasets: [
                  {
                    data: [data.confirmed, data.recovered, data.deaths],
                  },
                ],
              }}
              bezier
              width={width}
              height={420}
              chartConfig={chartConfig}
            />
          </>
        ) : null}
      </Content>
    </Container>
  );
};
const chartConfig = {
  backgroundColor: "#333fff",
  backgroundGradientFrom: "#333fff",
  backgroundGradientTo: "#333fff",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 4,
  barPercentage: 1.5,
  decimalPlaces: 1,
};

export default Region;
