import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, AsyncStorage } from "react-native";
import { Header } from "../../components/Header";

interface ListTelephonyProps {
  id: string;
  line_number: string;
  chip_number: string;
  data_plan: string;
  account_name: string;
  telephone_operator: string;
}

interface ListTotalProps {
  id: string;
  mLine: string;
  mDataPlan: string;
  ddNumber: string;
}

export function ListTotal() {
  const [listTotal, setListTotal] = useState<ListTotalProps[]>([]);
  let linesTelephone: ListTelephonyProps[] = [];
  let linesTelephoneAll: ListTotalProps[] = [];

  async function loadDataTelephony() {
    const data = await AsyncStorage.getItem("@mytelephony:telephone");
    if (data) {
      linesTelephone = JSON.parse(data);
      linesTelephoneAll = linesTelephone.map((tel) => {
        const data = {
          id: tel.id,
          mLine: tel.telephone_operator,
          mDataPlan: tel.data_plan,
          ddNumber: tel.line_number,
        };
        return data;
      });
      setListTotal(linesTelephoneAll);
    }
  }

  function totOperator(linesOperator: string) {
    return listTotal.reduce(
      (totOperator, operator) =>
        operator.mLine.includes(linesOperator)
          ? (totOperator += 1)
          : (totOperator += 0),
      0
    );
  }

  function totNumberDD(dd: string) {
    return listTotal.reduce(
      (totNumberDD, number) =>
        number.ddNumber.includes(dd) ? (totNumberDD += 1) : (totNumberDD += 0),
      0
    );
  }

  function totDataPlan(plan: string) {
    return listTotal.reduce(
      (totplan, number) =>
        number.mDataPlan.includes(plan) ? (totplan += 1) : (totplan += 0),
      0
    );
  }

  useEffect(() => {
    loadDataTelephony();
  });

  useFocusEffect(
    useCallback(() => {
      loadDataTelephony();
    }, [])
  );

  return (
    <View>
      <Header title="Total de Linhas Cadastradas" />
      <View style={styles.card}>
        <Text style={styles.titleCard}>Total de Linhas</Text>
        <Text style={styles.textCard}>
          Operadora Vivo: {totOperator("Vivo")}{" "}
        </Text>
        <Text style={styles.textCard}>
          Operadora Claro: {totOperator("Claro")}
        </Text>
        <Text style={styles.textCard}>Operadora Tim: {totOperator("Tim")}</Text>
        <Text style={styles.textCard}>Operadora Oi: {totOperator("Oi")} </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.titleCard}>Total de DD's</Text>
        <Text style={styles.textCard}>DD 24: {totNumberDD("24")} </Text>
        <Text style={styles.textCard}>DD 31: {totNumberDD("31")} </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.titleCard}>Total de Planos</Text>
        <Text style={styles.textCard}>Planos 10gb: {totDataPlan("10gb")} </Text>
        <Text style={styles.textCard}>Planos 20gb: {totDataPlan("20gb")} </Text>
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f0f2f5",
  },
  card: {
    backgroundColor: "#969CB2",
    padding: 6,
    borderRadius: 10,
    margin: 10,
  },

  textCard: {
    color: "#f0f2f5",
    fontSize: 20,
    fontWeight: "bold",
    flexDirection: "row",
    margin: 10,
  },
  titleCard: {
    color: "#A020F0",
    fontSize: 26,
    fontWeight: "bold",
    flexDirection: "row",
    margin: 10,
    textAlign: "center",
  },
});
