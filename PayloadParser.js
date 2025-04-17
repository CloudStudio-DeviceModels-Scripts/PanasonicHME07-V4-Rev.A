function parseUplink(device, payload) {
    function ExtractTagData(tagValuesObject) {
        return {
            v: tagValuesObject["v"] !== null && typeof tagValuesObject["v"] === "number" 
                ? tagValuesObject["v"].toFixed(2) 
                : tagValuesObject["v"],
            q: tagValuesObject["q"],
            ts: new Date(tagValuesObject["ts"]).toUTCString()
        };
    }

    const PanasonicData = JSON.parse(payload.asString());
    env.log(PanasonicData);

    PanasonicData.forEach(dataElement => {
        const tag = dataElement.tag;
        const tagValuesObject = dataElement.v;

        const ValueData = ExtractTagData(tagValuesObject);

        let endpointAddress = null;

        // Map tags to endpoint addresses based on the configuration script
        const tagToEndpointMap = {
            "CL01_activacion": "1",
            "FM1_escalado": "2",
            "FM2_escalado": "3",
            "FM3_escalado": "4",
            "LHT01_estado": "5",
            "LHT02_estado": "6",
            "LLT01_estado": "7",
            "MR01_giro": "8",
            "MR01_marcha": "9",
            "MR02_giro": "10",
            "MR02_marcha": "11",
            "MR02_velocidad": "12",
            "NV11_apertura": "13",
            "NV12_apertura": "14",
            "NV13_apertura": "15",
            "NV14_apertura": "16",
            "NV15_apertura": "17",
            "NV19_apertura": "18",
            "NV3_apertura": "19",
            "NV6_apertura": "20",
            "PM1_marcha": "21",
            "PM1_velocidad": "22",
            "PM2_marcha": "23",
            "PM3_marcha": "24",
            "PM3_velocidad": "25",
            "PM4_marcha": "26",
            "PM6_marcha": "27",
            "PT100_1_escalado": "28",
            "PT100_100_escalado": "29",
            "PT100_101_escalado": "30",
            "PT100_12_escalado": "31",
            "PT100_13_escalado": "32",
            "PT100_15_escalado": "33",
            "PT100_16_escalado": "34",
            "PT100_2_escalado": "35",
            "PT100_3_escalado": "36",
            "PT100_5_escalado": "37",
            "PT100_6_escalado": "38",
            "PT100_7_escalado": "39",
            "PT100_8_escalado": "40",
            "PT100_9_escalado": "41",
            "PT100_Armario_escalado": "42",
            "RV2_apertura": "43",
            "SR1_Seta_estado": "44",
            "SV6_apertura": "45",
            "TP1_raw": "46",
            "TP15_raw": "47",
            "TP2_raw": "48",
            "TP3_raw": "49",
            "TP4_raw": "50",
            "TP5_raw": "51",
            "TP6_raw": "52",
            "WT-01_raw": "53"
        };

        endpointAddress = tagToEndpointMap[tag];

        if (endpointAddress) {
            const endpoint = device.endpoints.byAddress(endpointAddress);
            endpoint.updateGenericSensorStatus(ValueData.v, ValueData.ts);
        }
    });
}