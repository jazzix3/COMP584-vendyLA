import React from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";


const PlacesAutoComplete = ({ setLocation }) => {

    const {
        ready,                          
        value,                          
        setValue,
        suggestions: { status, data },    
        clearSuggestions                
    } = usePlacesAutocomplete();


    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        
        const results = await getGeocode({ address });     
        const { lat, lng } = await getLatLng(results[0]);

        
        setLocation({                    // prop passed from component gets set when address is selected
            address: address,
            latitude: lat,
            longitude: lng
        });
        };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput className="combobox-input" value={value} onChange={e => setValue(e.target.value)} disable={!ready}  />
            <ComboboxPopover>
                <ComboboxList>
                    {status ==="OK" && data.map(({ place_id, description }) => (
                        <ComboboxOption key= {place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}

export default PlacesAutoComplete