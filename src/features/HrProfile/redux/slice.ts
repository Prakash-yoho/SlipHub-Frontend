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
    ctc: 0,
    dob: "",
    emg_contact: "",
    father_name: "",
    qualification: {
        degree: "",
        specialization: "",
        year_of_completion: "",
        percentage: ""
    },
    pf_active: false,
    image: "",
    is_active: false
}

const data: HrProfileType[] = []

const selectedHr: HrProfileType = {}

const HrSlice = createSlice({
    name: "HrSclive",
    initialState: { hrprofile, data, selectedHr },
    reducers: {
        getHrDetails: (state, action) => {
            state.data = action.payload
        },
        addAndUpdateHrProfile: (state, action: PayloadAction<HrProfileType>) => {
            const data = action.payload

            const index = state.data.findIndex((item: HrProfileType) => item.uuid === data.uuid)

            if (index !== -1) {
                state.data[index] = data
            } else {
                state.data.unshift(data)
            }
        },
        deleteHrDetails: (state, action: PayloadAction<string>) => {
            const data = action.payload
            const index = state.data.findIndex((item: HrProfileType) => item.uuid === data)
            state.data.splice(index, 1)
        },
        getOneHr: (state, action) => {
            state.selectedHr = action.payload
        },
        clearHr: (state) => {
            state.selectedHr = {}
        }
    },
})


export const { addAndUpdateHrProfile, getHrDetails, deleteHrDetails, getOneHr, clearHr } = HrSlice.actions
export default HrSlice.reducer