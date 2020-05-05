import React, { useEffect, useState } from "react";
import {
  Container,
  Text,
  View,
  Header,
  Title,
  Body,
  Left,
  Right,
  H2,
  Content,
  Card,
  CardItem,
  H3,
  Spinner,
} from "native-base";
import AnimateNumber from "react-native-countup";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { fetchData, fetchDailyData } from "../api/index";

const Global = () => {
  const [data, setData] = useState([]);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await fetchData();
      const resp = await fetchDailyData();
      setData(res);
      setDaily(resp);
    };
    fetchAPI();
  }, []);

  if (!data || !daily.length) {
    return (
      <Container>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Spinner color="green" />
        </View>
      </Container>
    );
  }

  const lineChart =
    daily.length > 0 ? (
      <LineChart
        data={{
          labels:
            daily &&
            daily.map(({ date }, i) => {
              if (i % 100 === 0) {
                return date;
              } else if (i === parseInt(daily.length / 2)) {
                return "Date";
              } else {
                return "";
              }
            }),
          datasets: [
            {
              data: daily && daily.map(({ confirmed }) => confirmed),
              color: (opacity = 1) => `rgba(255, 167, 38, ${opacity})`,
            },
            {
              data: daily && daily.map(({ deaths }) => deaths),
            },
          ],
          legend: ["Infected", "Deaths"],
        }}
        xLabelsOffset={-10}
        verticalLabelRotation={90}
        width={Dimensions.get("window").width - 5} // from react-native
        height={420}
        yAxisInterval={15} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#3333ff",
          backgroundGradientFrom: "#3333ff",
          backgroundGradientTo: "#3333ff",

          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          decimalPlaces: 0,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 4,
        }}
      />
    ) : null;

  const { confirmed, recovered, deaths, lastUpdate } = data;
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Global</Title>
        </Body>
        <Right />
      </Header>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Content>
          <Card>
            <CardItem header>
              <H3 style={{ color: "blue" }}>Currently Active Cases</H3>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  <AnimateNumber
                    initial={0}
                    value={confirmed}
                    timing="easeOut"
                    formatter={(val) => {
                      return +parseFloat(val).toFixed(0);
                    }}
                  />
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text> Last Updated : {new Date(lastUpdate).toDateString()}</Text>
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
                    value={recovered}
                    timing="easeOut"
                    formatter={(val) => {
                      return +parseFloat(val).toFixed(0);
                    }}
                  />
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Last Updated : {new Date(lastUpdate).toDateString()}</Text>
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
                    value={deaths}
                    timing="easeOut"
                    formatter={(val) => {
                      return +parseFloat(val).toFixed(0);
                    }}
                  />
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Last Updated :{new Date(lastUpdate).toDateString()}</Text>
            </CardItem>
          </Card>
          <View style={{ padding: 2 }}>{lineChart}</View>
        </Content>
      </View>
    </Container>
  );
};

export default Global;
