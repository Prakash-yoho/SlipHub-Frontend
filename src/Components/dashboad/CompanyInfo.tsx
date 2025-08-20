import React from 'react'

const CompanyInfo: React.FC = () => {
    return (
        <div className='p-4 flex flex-row gap-10'>
            <div className="w-40 h-24 border rounded-lg bg-[#bcc7b5]">

            </div>

            <div className="">
                <h1>Organsation Name:</h1>
                <h1>Yoho Technologies pvt ltd</h1>
            </div>
            <div className="">
                <h1>Organsation Mail:</h1>
                <h1>admin@yohotechnologies.com</h1>
            </div>
            <div className="">
                <h1>Organsation Phone:</h1>
                <h1>+91 12345 67890</h1>
            </div>

            <div className="">
                <h1>Organsation Address:</h1>
                <h1>address</h1>
            </div>

            <div className="">
                <h1>working Days:</h1>
                <h1>address</h1>
            </div>

            <div className="">
                <h1>working Hours:</h1>
                <h1>address</h1>
            </div>

            <div className="">
                <h1>website:</h1>
                <h1>address</h1>
            </div>
        </div>
    )
}

export default CompanyInfo