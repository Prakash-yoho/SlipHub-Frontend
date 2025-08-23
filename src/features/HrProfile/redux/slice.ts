import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type HrProfileType } from '../../../Type/HrProfiles/Type'

const hrprofile: HrProfileType = {
    id: 0,
    auth_id: "",
    uuid: "",
    emp_id: "",
    first_name: "",
    last_name: "",
    department: [],
    contact_info: {
        email: "",
        phone: "",
        address: ""
    },
    join_date: "",
    experience: "",
    ctc: "",
    dob: "",
    emg_contact: "",
    father_name: "",
    qualification: {
        degree: "",
        specialization: "",
        year_of_completion: "",
        perscentage: ""
    },
    pf_active: false,
    image: "",
    is_active: false
}

const data: HrProfileType[] = []

const HrSlice = createSlice({
    name: "HrSclive",
    initialState: { hrprofile, data },
    reducers: {
        getHrDetails: (state, action) => {
            state.data = action.payload
        },
        addHrProfile: (state, action: PayloadAction<HrProfileType>) => {
            state.data = [...state.data, action.payload]
        },

    },
})


export const { addHrProfile, getHrDetails } = HrSlice.actions
export default HrSlice.reducer