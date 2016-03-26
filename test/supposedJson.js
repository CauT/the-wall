module.exports = {
  device: {
    type_list: '[{"DEVICENAME":"(Water Level"},{"DEVICENAME":"Air Temp"},{"DEVICENAME":"B1(Soil Temp)"},{"DEVICENAME":"DO0"},{"DEVICENAME":"DO1"},{"DEVICENAME":"DO2"},{"DEVICENAME":"DO3"},{"DEVICENAME":"DO4"},{"DEVICENAME":"DO5"},{"DEVICENAME":"DO6"},{"DEVICENAME":"DO7"},{"DEVICENAME":"E2(Soil Hum)"},{"DEVICENAME":"Light"},{"DEVICENAME":"Soil Hum"},{"DEVICENAME":"Soil Salt"},{"DEVICENAME":"Soil Temp"},{"DEVICENAME":"Water Level"}]',
    station_list: '[{"NAME":"A1"},{"NAME":"B1"},{"NAME":"B2"},{"NAME":"B3"},{"NAME":"DO"},{"NAME":"E1"},{"NAME":"E2"}]',
  },
  agri_env: {
    current_with_deviceName_Light: '[{"DEVICECODE":"A1GZ1","DEVICENAME":"Light","VALUE":1000,"UNIT":"Lux"},{"DEVICECODE":"A1GZ2","DEVICENAME":"Light","VALUE":0,"UNIT":"Lux"},{"DEVICECODE":"B1GZ1","DEVICENAME":"Light","VALUE":19370.188000000002,"UNIT":"Lux"},{"DEVICECODE":"B1GZ2","DEVICENAME":"Light","VALUE":724.1875,"UNIT":"Lux"},{"DEVICECODE":"B2GZ1","DEVICENAME":"Light","VALUE":1000,"UNIT":"Lux"},{"DEVICECODE":"B2GZ2","DEVICENAME":"Light","VALUE":0,"UNIT":"Lux"},{"DEVICECODE":"B3GZ1","DEVICENAME":"Light","VALUE":1000,"UNIT":"Lux"},{"DEVICECODE":"B3GZ2","DEVICENAME":"Light","VALUE":0,"UNIT":"Lux"},{"DEVICECODE":"E1GZ1","DEVICENAME":"Light","VALUE":42043.75,"UNIT":"Lux"},{"DEVICECODE":"E1GZ2","DEVICENAME":"Light","VALUE":785.875,"UNIT":"Lux"},{"DEVICECODE":"E2GZ1","DEVICENAME":"Light","VALUE":18026.938000000002,"UNIT":"Lux"},{"DEVICECODE":"E2GZ2","DEVICENAME":"Light","VALUE":970.4375,"UNIT":"Lux"}]',
    current_with_stationName_A1: '[{"DEVICECODE":"A1GZ1","DEVICENAME":"Light","VALUE":1000,"UNIT":"Lux"},{"DEVICECODE":"A1GZ2","DEVICENAME":"Light","VALUE":0,"UNIT":"Lux"},{"DEVICECODE":"A1KW","DEVICENAME":"Air Temp","VALUE":-20.18125,"UNIT":"C"},{"DEVICECODE":"A1SW","DEVICENAME":"Water Level","VALUE":0.0010625,"UNIT":"m"},{"DEVICECODE":"A1TS","DEVICENAME":"Soil Hum","VALUE":0,"UNIT":"%"},{"DEVICECODE":"A1TW","DEVICENAME":"Soil Temp","VALUE":0,"UNIT":"C"},{"DEVICECODE":"A1TY","DEVICENAME":"Soil Salt","VALUE":0.01875,"UNIT":"mS/cm"}]',
    current_with_deviceName_Light_and_stationName_A1: '[{"DEVICECODE":"A1GZ1","DEVICENAME":"Light","VALUE":1000,"UNIT":"Lux"},{"DEVICECODE":"A1GZ2","DEVICENAME":"Light","VALUE":0,"UNIT":"Lux"}]',
  },
  utils: {
    generate_graph: {
      getSupposedDeviceValueInTimeGap: '[{"DEVICEHISTROYID":3639248,"DEVICEID":172,"RECTIME":1443652962,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3639373,"DEVICEID":172,"RECTIME":1443653150,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3639541,"DEVICEID":172,"RECTIME":1443653402,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3639711,"DEVICEID":172,"RECTIME":1443653654,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3638583,"DEVICEID":172,"RECTIME":1443651959,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638707,"DEVICEID":172,"RECTIME":1443652146,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638918,"DEVICEID":172,"RECTIME":1443652460,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3639460,"DEVICEID":172,"RECTIME":1443653277,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3637285,"DEVICEID":172,"RECTIME":1443650011,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637408,"DEVICEID":172,"RECTIME":1443650201,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637784,"DEVICEID":172,"RECTIME":1443650768,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637866,"DEVICEID":172,"RECTIME":1443650895,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637914,"DEVICEID":172,"RECTIME":1443650958,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637955,"DEVICEID":172,"RECTIME":1443651020,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638331,"DEVICEID":172,"RECTIME":1443651584,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638373,"DEVICEID":172,"RECTIME":1443651646,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3639962,"DEVICEID":172,"RECTIME":1443654030,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3640041,"DEVICEID":172,"RECTIME":1443654155,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3640125,"DEVICEID":172,"RECTIME":1443654280,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3640292,"DEVICEID":172,"RECTIME":1443654529,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3640333,"DEVICEID":172,"RECTIME":1443654592,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3640417,"DEVICEID":172,"RECTIME":1443654716,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3638499,"DEVICEID":172,"RECTIME":1443651834,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638792,"DEVICEID":172,"RECTIME":1443652273,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3639162,"DEVICEID":172,"RECTIME":1443652837,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3639416,"DEVICEID":172,"RECTIME":1443653214,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3639500,"DEVICEID":172,"RECTIME":1443653339,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3639583,"DEVICEID":172,"RECTIME":1443653466,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3639669,"DEVICEID":172,"RECTIME":1443653591,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3639752,"DEVICEID":172,"RECTIME":1443653717,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3639835,"DEVICEID":172,"RECTIME":1443653842,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3639796,"DEVICEID":172,"RECTIME":1443653780,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3639921,"DEVICEID":172,"RECTIME":1443653968,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3640002,"DEVICEID":172,"RECTIME":1443654092,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3640086,"DEVICEID":172,"RECTIME":1443654218,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3640167,"DEVICEID":172,"RECTIME":1443654342,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3640211,"DEVICEID":172,"RECTIME":1443654404,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3640249,"DEVICEID":172,"RECTIME":1443654466,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3640375,"DEVICEID":172,"RECTIME":1443654654,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3637328,"DEVICEID":172,"RECTIME":1443650074,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637452,"DEVICEID":172,"RECTIME":1443650264,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637535,"DEVICEID":172,"RECTIME":1443650392,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637618,"DEVICEID":172,"RECTIME":1443650517,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637746,"DEVICEID":172,"RECTIME":1443650706,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638037,"DEVICEID":172,"RECTIME":1443651145,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3640459,"DEVICEID":172,"RECTIME":1443654779,"SWITCHVALUE":null,"ANALOGYVALUE":3052.1875},{"DEVICEHISTROYID":3640501,"DEVICEID":172,"RECTIME":1443654842,"SWITCHVALUE":null,"ANALOGYVALUE":3052.1875},{"DEVICEHISTROYID":3640543,"DEVICEID":172,"RECTIME":1443654904,"SWITCHVALUE":null,"ANALOGYVALUE":3052.1875},{"DEVICEHISTROYID":3640585,"DEVICEID":172,"RECTIME":1443654968,"SWITCHVALUE":null,"ANALOGYVALUE":3052.1875},{"DEVICEHISTROYID":3637363,"DEVICEID":172,"RECTIME":1443650137,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637661,"DEVICEID":172,"RECTIME":1443650580,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638121,"DEVICEID":172,"RECTIME":1443651272,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638163,"DEVICEID":172,"RECTIME":1443651334,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638079,"DEVICEID":172,"RECTIME":1443651209,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638204,"DEVICEID":172,"RECTIME":1443651396,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638248,"DEVICEID":172,"RECTIME":1443651458,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638624,"DEVICEID":172,"RECTIME":1443652021,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638666,"DEVICEID":172,"RECTIME":1443652084,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638834,"DEVICEID":172,"RECTIME":1443652335,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638959,"DEVICEID":172,"RECTIME":1443652524,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3639002,"DEVICEID":172,"RECTIME":1443652586,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3638750,"DEVICEID":172,"RECTIME":1443652209,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638876,"DEVICEID":172,"RECTIME":1443652397,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637574,"DEVICEID":172,"RECTIME":1443650454,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637994,"DEVICEID":172,"RECTIME":1443651083,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638457,"DEVICEID":172,"RECTIME":1443651770,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637495,"DEVICEID":172,"RECTIME":1443650328,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637704,"DEVICEID":172,"RECTIME":1443650644,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3637819,"DEVICEID":172,"RECTIME":1443650831,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638291,"DEVICEID":172,"RECTIME":1443651520,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638415,"DEVICEID":172,"RECTIME":1443651708,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3638541,"DEVICEID":172,"RECTIME":1443651897,"SWITCHVALUE":null,"ANALOGYVALUE":1037.3125},{"DEVICEHISTROYID":3639042,"DEVICEID":172,"RECTIME":1443652648,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3639083,"DEVICEID":172,"RECTIME":1443652712,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3639120,"DEVICEID":172,"RECTIME":1443652774,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3639209,"DEVICEID":172,"RECTIME":1443652900,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3639290,"DEVICEID":172,"RECTIME":1443653025,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3639331,"DEVICEID":172,"RECTIME":1443653088,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125},{"DEVICEHISTROYID":3639626,"DEVICEID":172,"RECTIME":1443653528,"SWITCHVALUE":null,"ANALOGYVALUE":2019.875},{"DEVICEHISTROYID":3639877,"DEVICEID":172,"RECTIME":1443653905,"SWITCHVALUE":null,"ANALOGYVALUE":2032.3125}]',
    }
  }
}