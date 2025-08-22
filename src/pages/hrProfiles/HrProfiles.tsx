import { COLORS, FONTS } from '../../constants/uiconstants'

const HrProfiles = () => {
    return (
        <div className='py-6 '>
            <div className='flex justify-between items-center'>
                <h1 style={{ ...FONTS.Main, color: COLORS.primary }}>Hr Profiles</h1>
                <button style={{ ...FONTS.Main_btn, background: COLORS.primary }} className='text-[#FFFFFF] px-3 py-[4px] rounded-md'>Add HR</button>
            </div>

            <div className='flex justify-between items-center mt-6'>
                <section className='flex gap-4'>
                    <button style={{ ...FONTS.Main_btn, background: COLORS.sub_btn }} className='text-[#FFFFFF] px-3 py-[4px] rounded-md'>Department</button>
                    <button style={{ ...FONTS.Main_btn, background: COLORS.sub_btn }} className='text-[#FFFFFF] px-3 py-[4px] rounded-md'>Experience</button>
                </section>
                <input type="text" className='bg-[#4A70790D] text-[#4A7079] font-bold border border-[#4A7079] rounded-md px-3 py-[6px] outline-0 w-[400px]' placeholder='Search' />
            </div>

            <div className='mt-10 grid grid-cols-3 gap-6 lg:h-[57vh] xl:h-[62vh] 2xl:h-[70vh] p-2 overflow-y-scroll scrollbar-hide'>

                {Array(10)
                    .fill(null)
                    .map((_, index) => (
                        <section className='shadow-[0px_0px_15px_0px_#4A707966] p-4 rounded-xl' style={{ background: COLORS.card_bg }}>
                            <div className='flex justify-between items-center'>
                                <section className='flex gap-4 items-center mb-4'>
                                    <div className='bg-[#DDDED9] text-[#4A7079] h-[80px] w-[80px] rounded-xl flex justify-center items-center' style={{ ...FONTS.card_initial }}>K</div>
                                    <div className='grid gap-1'>
                                        <h1 style={{ ...FONTS.card_name, color: COLORS.primary }}>Kamal</h1>
                                        <p style={{ ...FONTS.Nav }} className='uppercase text-[#5A5A5A]'>yt2505</p>
                                    </div>
                                </section>
                                <button style={{ ...FONTS.view_btn, background: COLORS.primary }} className='text-[#FFFFFF] px-3 py-[4px] rounded-md'>View</button>
                            </div>

                            <div className='text-[#7697A0] flex justify-between'>
                                <p style={{ ...FONTS.card_role }}>Software Development</p>
                                <span className='w-[2px] bg-[#C3C7C6]'></span>
                                <p style={{ ...FONTS.card_role }}>hrd@yohotechnologies</p>
                            </div>

                            <div className=' grid grid-cols-3 gap-2 mt-5'>
                                <p className='bg-[#E0E0E0] p-2 rounded-lg font-semibold' style={{ ...FONTS.card_detail, color: COLORS.primary }}>Join Date : 08-08-2025</p>
                                <p className='bg-[#E0E0E0] p-2 rounded-lg font-semibold' style={{ ...FONTS.card_detail, color: COLORS.primary }}>Experience : 2 Years</p>
                                <p className='bg-[#E0E0E0] p-2 rounded-lg font-semibold' style={{ ...FONTS.card_detail, color: COLORS.primary }}>Current CTC : 2,00,000</p>
                            </div>
                        </section>

                    ))}
            </div>
        </div>
    )
}

export default HrProfiles