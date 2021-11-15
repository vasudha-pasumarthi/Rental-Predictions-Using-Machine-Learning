import React from "react";
import Select from "./common/Select";


import './index.css'

const HeatingType = [
  'central_heating',
  'combined_heat_and_power_plant',
  'district_heating',
  'electric_heating',
  'floor_heating',
  'gas_heating',
  'heat_pump',
  'night_storage_heater',
  'oil_heating ',
  'self_contained_central_heating',
  'solar_heating',
  'stove_heating',
  'wood_pellet_heating'
];

const NewlyConstructed = ['Yes', 'No'];
const Balcony = ['Yes', 'No'];
const HasKitchen = ['Yes', 'No'];
const Cellar = ['Yes', 'No'];
const Lift = ['Yes', 'No'];
const Garden = ['Yes', 'No'];
const Regions = [
  'Baden_Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg_Vorpommern',
  'Niedersachsen',
  'Nordrhein_Westfalen',
  'Rheinland_Pfalz',
  'Saarland ',
  'Sachsen',
  'Sachsen_Anhalt',
  'Schleswig_Holstein',
  'Thüringen'
];
const NoRooms = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
const Floor = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','36','37','41','45','80']
const Flat = [
  'apartment',
  'ground_floor',
  'half_basement',
  'loft',
  'maisonewtte',
  'other',
  'penthouse',
  'raised_ground_floor',
  'roof_storey',
  'terraced_flat '
];
const InteriorQuality = [
  'simple',
  'luxury',
  'normal',
  'sophisticated'

];
const Condition = [
  'first_time_use',
  'first_time_use_after_refurbishment',
  'fully_renovated',
  'mint_condition',
  'modernized',
  'need_of_renovation',
  'negotiable',
  'refurbished',
  'well_kept',
];

class Dashboard extends React.Component {
  state = {
    data: {
      selectedoutletLocation: "",
      selectedoutletIdentifier: "",
      selectedCategory: "",
      itemNumber: "",
      overallSalesOfSelectedOutlet: [],
      overallSalesOfSelectedTier: {},
      overallSalesOfSelectedCategory: {},
      itemsInCategory: [],
    },
    value: '',
    itemIdentifier: [],
    tableData: [],
    itemsalesData: [],
    categorysalesData: [],
    condition: Condition,
    interiorQuality: InteriorQuality,
    flat: Flat,
    floor: Floor,
    rooms: NoRooms,
    regions: Regions,
    garden: Garden,
    lift: Lift,
    kitchen: HasKitchen,
    balcony: Balcony,
    constructed: NewlyConstructed,
    heatingType: HeatingType,
    cellar: Cellar,



  };
  baseState = { ...this.state };

  heatingType = [
    'central_heating',
    'combined_heat_and_power_plant',
    'district_heating',
    'electric_heating',
    'floor_heating',
    'gas_heating',
    'heat_pump',
    'night_storage_heater',
    'oil_heating ',
    'self_contained_central_heating',
    'solar_heating',
    'stove_heating',
    'wood_pellet_heating'
  ];

  newlyConstructed = ['true', 'false'];
  balcony = ['true', 'false'];
  hasKitchen = ['true', 'false'];
  cellar = ['true', 'false'];
  lift = ['true', 'false'];
  garden = ['true', 'false'];
  regions = [
    'Baden_Württemberg',
    'Bayern',
    'Berlin',
    'Brandenburg',
    'Bremen',
    'Hamburg',
    'Hessen',
    'Mecklenburg_Vorpommern',
    'Niedersachsen',
    'Nordrhein_Westfalen',
    'Rheinland_Pfalz',
    'Saarland ',
    'Sachsen',
    'Sachsen_Anhalt',
    'Schleswig_Holstein',
    'Thüringen'
  ];
  NoRooms = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
  Floor = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','36','37','41','45','80']
  flat = [
    'apartment',
    'ground_floor',
    'half_basement',
    'loft',
    'maisonette',
    'other',
    'penthouse',
    'raised_ground_floor',
    'roof_storey',
    'terraced_flat '
  ];
  InteriorQuality = [
    'Simple',
    'Luxury',
    'Normal',
    'Sophisticated'

  ];
  Condition = [
    'First Time Use',
    'First Time Use After Refurbishment',
    'Fully Renovated',
    'Mint Condition',
    'Modernized',
    'Need of Renovation',
    ' Negotiable',
    'Refurbished',
    'Well Kept',
  ];

  predictRent = async (e) => {
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      crossDomain: true,
      body: JSON.stringify({
        "region": this.state.region,
        "heatingType": this.state.heatingValue,
        "newlyConst" : (this.state.newlyConst === "Yes") ? true :false,
        "balcony" : (this.state.balconyVal === "Yes") ? true :false,
        "hasKitchen" : (this.state.kitchenVal === "Yes") ? true :false,
        "cellar" : (this.state.cellarVal === "Yes") ? true :false,
        "livingSpace" : this.state.livingSpace,
        "condition" : this.state.conditionVal,
        "interiorQual" : this.state.interiorQualityVal,
        "lift" : (this.state.liftVal === "Yes") ? true :false,
        "typeOfFlat" : this.state.flatVal,
        "noRooms" : this.state.roomsVal,
        "floor" : this.state.floorVal,
        "garden" : (this.state.gardenVal === "Yes") ? true :false,
        "zipcode": this.state.zipcode,
      }),
    };
    let response = await fetch("http://localhost:5000/predict/", requestOptions);
    response = await response.json();
    console.log(response)
    const data = { ...this.state.data};
    data.resultasds = "Your apartment will cost between €"+response[0]+" and €"+response[1];
    this.setState({ data});
  }
 

 

  renderSelectComponent = (title, options) => {
    return (
      <Select
        name={title}
        value={this.state.data.selectedoutletIdentifier}
        onChange={this.handleOutletChangeFetchCategories}
        options={options}
        default={title}
      />
    )
  }

  onChange = (category, value) => {
    debugger;
    switch(category) {
      case 'regions':
      this.setState({
        region: value,
      })
      break;
      case 'heatingValue':
      this.setState({
        heatingValue: value,
      })
      break;
      case 'condition':
      this.setState({
        conditionVal: value,
      })
      break;
      case 'interiorQuality':
      this.setState({
        interiorQualityVal: value,
      })

      break;
      case 'flat':
      this.setState({
        flatVal: value,
      })
      break;
      case 'floor':
      this.setState({
        floorVal: value,
      })
      break;
      case 'rooms':
      this.setState({
        roomsVal: value,
      });
      break;

      case 'construct':
        this.setState({
          construct: value,
        });
        break;

      case 'garden':
      this.setState({
        gardenVal: value,
      })
      break;
      case 'lift':
      this.setState({
        liftVal: value,
      })
      break;
      case 'kitchen':
      this.setState({
        kitchenVal: value,
      })
      break;
      case 'balcony':
      this.setState({
        balconyVal: value,
      })
      break;
      case 'cellar':
      this.setState({
        cellarVal: value,
      });
      break;

      case 'zipCode':
        this.setState({
          zipcode: value,
        });
        break;

      case 'livingSpace':
        this.setState({
          livingSpace: value,
        });
        break;

        default:
        console.log('breal');
    }

  }

  render() {
    return (
      
      <div >
        
        <div className='bannerImage'>
            <div className="title">
              <h4 style={{color: 'white', fontFamily: 'cursive', fontSize: '53px'}}>
                Rent Prediction
              </h4>
              <p style={{fontStyle: 'italic', color: 'white', fontFamily: 'fangsong'}}>
                Know the price of your dream apartment
              </p>
            
            
             </div>
             <div className="container-fluid">
                <div className="row m-b-10">
                  <div className="col-2">
                    <label className="label">Region</label>
                  <Select
                      name="regions"
                      value={this.state.region}
                      onChange={(event) => this.onChange('regions', event.target.value)}
                      options={this.state.regions}
                      default="Select Region"

                      // disabled={isEmpty(this.state.data.selectedoutletLocation)}
                    />

                  </div>
                  <div className="col-2">
                  <label className="label">Zip Code</label>
                  <input
                    type="text"
                    style={{width: '100%',height:'50%'}}
                    value={this.state.zipcode}
                    placeholder="Zip Code"
                    onChange={(event) => this.onChange('zipCode', event.target.value)}
                    />
                
                  </div>
                  <div className="col-2">
                  <label className="label">Living Space</label>
                    <input type="text" placeholder="LivingSpace" style={{width: '100%',height:'50%'}} value={this.state.livingSpace}
                    onChange={(event) => this.onChange('livingSpace', event.target.value)} />
                  </div>
                  <div className="col-2">
                  <label className="label">Heating Type</label>
                    <Select name="heatingType"
                        value={this.state.heatingValue}
                        onChange={(event) => this.onChange('heatingValue', event.target.value)}
                        options={this.state.heatingType}
                        default="Select Heating Type"
                      />
                  </div>
                  <div className="col-2">
                  <label className="label">Newly Constructed</label>
                    <Select
                      name="newlyConstructed"
                      value={this.state.construct}
                      onChange={(event) => this.onChange('construct', event.target.value)}
                      options={this.state.constructed}
                      default="Newly Constructed"
                    />
                  </div>
                  <div className="col-2">
                  <label className="label">Balcony</label>
                    <Select
                      name="balcony"
                      value={this.state.balconyVal}
                      onChange={(event) => this.onChange('balcony', event.target.value)}
                      options={this.state.balcony}
                      default="Balcony"
                    />
                  </div>
                  
                </div>
                <div className="row m-b-10">
                  <div className="col-2">
                  <label className="label">Kitchen</label>
                    <Select
                      name="kitchen"
                      value={this.state.kitchenVal}
                      onChange={(event) => this.onChange('kitchen', event.target.value)}
                      options={this.state.kitchen}
                      default="Kitchen"
                    />
                  </div>
                  <div className="col-2">
                  <label className="label">Cellar</label>
                    <Select
                      name="cellar"
                      value={this.state.cellarVal}
                      onChange={(event) => this.onChange('cellar', event.target.value)}
                      options={this.state.cellar}
                      default="Cellar"
                    />
                  </div>
                  <div className="col-2">
                  <label className="label">Elevator</label>
                    <Select
                      name="Lift"
                      onChange={(event) => this.onChange('lift', event.target.value)}
                      value={this.state.liftVal}
                      options={this.state.lift}
                      default="Elevator"
                    />
                  </div>
                  <div className="col-2">
                  <label className="label">Type of Flat</label>
                    <Select
                      name="flat"
                      value={this.state.flatVal}
                      onChange={(event) => this.onChange('flat', event.target.value)}
                      options={this.state.flat}
                      default="Type of Flat"
                    />
                  </div>
                  <div className="col-2">
                  <label className="label">Garden</label>
                    <Select
                      name="garden"
                      onChange={(event) => this.onChange('garden', event.target.value)}

                      value={this.state.gardenVal}
                      options={this.state.garden}
                      default="Garden"
                    />
                  </div>
                  <div className="col-2">
                  <label className="label">No of Rooms</label>
                    <Select
                      name="NoRooms"
                      value={this.state.roomsVal}
                      onChange={(event) => this.onChange('rooms', event.target.value)}

                      options={this.state.rooms}
                      default="No of Rooms"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                  <label className="label">Floor</label>
                    <Select
                      name="floor"
                      value={this.state.floorVal}
                      onChange={(event) => this.onChange('floor', event.target.value)}
                      options={this.state.floor}
                      default="Select Floor"
                    />
                  </div>
                  <div className="col-2">
                  <label className="label">Condition</label>
                    <Select
                      name="condition"
                      onChange={(event) => this.onChange('condition', event.target.value)}
                      value={this.state.conditionVal}
                      options={this.state.condition}
                      default="Select Condition"
                    />
                  </div>
                  <div className="col-2">
                  <label className="label">Interiors</label>
                    <Select
                      name="interiorQuality"
                      onChange={(event) => this.onChange('interiorQuality', event.target.value)}
                      value={this.state.interiorQualityVal}
                      options={this.state.interiorQuality}
                      default="Select Interiors type"
                    />
                  </div>
                </div>
             </div>
             <div style={{display: 'flex', justifyContent: 'center'}}>
            
            <div>
            <button className="btn btn-block btn-success mt-3" onClick={this.predictRent}> Predict Rent </button>
            <h4 style={{color: 'white'}} >{this.state.data.resultasds}</h4>
            </div> 
            
             </div>
            <div className="wrapper">
            </div>
      </div>
      </div>
    );
  }
}
export default Dashboard;
