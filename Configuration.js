function getConfiguration(config)
{
  // This function allows you to indicate general configuration values
  // for all devices of this model.

  // Depending on the meaning of the "device address" in this device, 
  // you may want to change the label that is used to refer to the 
  // address in the user interface.
  // For instance, if the address of the device is actually a MAC 
  // address, you may want to use the code below.
  
  config.addressLabel = {en: "MAC address", es: "Dirección MAC"};
}

function getEndpoints(deviceAddress, endpoints) {
  // This function allows you to indicate the initial endpoint configuration
  // when a device is created using this model. This improves end-user 
  // experience significantly, because it allows the platform to create
  // all endpoints included in the device automatically when the device
  // is created.

  // The configuration below has been adapted to match the provided table
  // where endpoints are created with variableTypeId based on their type.

  const data = [
    { tag: "CL01_activacion", type: "discreta" },
    { tag: "FM1_escalado", type: "escalar" },
    { tag: "FM2_escalado", type: "escalar" },
    { tag: "FM3_escalado", type: "escalar" },
    { tag: "LHT01_estado", type: "discreta" },
    { tag: "LHT02_estado", type: "discreta" },
    { tag: "LLT01_estado", type: "discreta" },
    { tag: "MR01_giro", type: "discreta" },
    { tag: "MR01_marcha", type: "discreta" },
    { tag: "MR02_giro", type: "discreta" },
    { tag: "MR02_marcha", type: "discreta" },
    { tag: "MR02_velocidad", type: "escalar" },
    { tag: "NV11_apertura", type: "discreta" },
    { tag: "NV12_apertura", type: "discreta" },
    { tag: "NV13_apertura", type: "discreta" },
    { tag: "NV14_apertura", type: "discreta" },
    { tag: "NV15_apertura", type: "discreta" },
    { tag: "NV19_apertura", type: "discreta" },
    { tag: "NV3_apertura", type: "discreta" },
    { tag: "NV6_apertura", type: "discreta" },
    { tag: "PM1_marcha", type: "discreta" },
    { tag: "PM1_velocidad", type: "escalar" },
    { tag: "PM2_marcha", type: "discreta" },
    { tag: "PM3_marcha", type: "discreta" },
    { tag: "PM3_velocidad", type: "escalar" },
    { tag: "PM4_marcha", type: "discreta" },
    { tag: "PM6_marcha", type: "discreta" },
    { tag: "PT100_1_escalado", type: "escalar" },
    { tag: "PT100_100_escalado", type: "escalar" },
    { tag: "PT100_101_escalado", type: "escalar" },
    { tag: "PT100_12_escalado", type: "escalar" },
    { tag: "PT100_13_escalado", type: "escalar" },
    { tag: "PT100_15_escalado", type: "escalar" },
    { tag: "PT100_16_escalado", type: "escalar" },
    { tag: "PT100_2_escalado", type: "escalar" },
    { tag: "PT100_3_escalado", type: "escalar" },
    { tag: "PT100_5_escalado", type: "escalar" },
    { tag: "PT100_6_escalado", type: "escalar" },
    { tag: "PT100_7_escalado", type: "escalar" },
    { tag: "PT100_8_escalado", type: "escalar" },
    { tag: "PT100_9_escalado", type: "escalar" },
    { tag: "PT100_Armario_escalado", type: "escalar" },
    { tag: "RV2_apertura", type: "discreta" },
    { tag: "SR1_Seta_estado", type: "discreta" },
    { tag: "SV6_apertura", type: "discreta" },
    { tag: "TP1_raw", type: "escalar" },
    { tag: "TP15_raw", type: "escalar" },
    { tag: "TP2_raw", type: "escalar" },
    { tag: "TP3_raw", type: "escalar" },
    { tag: "TP4_raw", type: "escalar" },
    { tag: "TP5_raw", type: "escalar" },
    { tag: "TP6_raw", type: "escalar" },
    { tag: "WT-01_raw", type: "escalar" }
  ];

  data.forEach((entry, index) => {
    const variableTypeId = entry.type === "escalar" ? 1363 : 1364;
    const endpoint = endpoints.addEndpoint(String(index + 1), entry.tag, endpointType.genericSensor);
    endpoint.variableTypeId = variableTypeId;
  });
}

function validateDeviceAddress(address, result)
{
  // This function allows you to validate the address of a device, when
  // the user is creating it. If your device has special validation rules
  // for the address, you can check them here, and return an error message
  // in case the address format is incorrect.

  // In the code below, a validation is made to ensure that the address 
  // is exactly 10 characters long.
  
  // if (address.length != 10) {
  //   result.ok = false;
  //   result.errorMessage = {
  //     en: "The address must be 10 characters long", 
  //     es: "La dirección debe tener exactamente 10 caracteres"
  //   };
  // }
}

function updateDeviceUIRules(device, rules)
{
  // This function allows you to specify UI rules at the device level.
  // For instance, you can make it possible to enable or disable adding
  // endpoints manually to the device after it was created.
  
  // In the code below, adding endpoints manually is disabled in the
  // user interface. This means that the device will be limited to the 
  // endpoints defined by function getEndpoints() above.
  
  rules.canCreateEndpoints = true;
}

function updateEndpointUIRules(endpoint, rules)
{
  // This function allows you to specify UI rules at the endpoint level.
  // For instance, you can make it possible to delete certain endpoints, 
  // or edit their endpoint subtype, if applicable.

  // In the code below, the following rules are defined:
  // - Endpoints cannot be deleted.
  // - The endpoint subtype can be changed, but only for the second 
  //   endpoint.
  
   rules.canDelete = true;
  // rules.canEditSubType = (endpoint.address == "2");
}