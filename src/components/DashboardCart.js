import React from 'react'
export default function DashboardCart(props) {
    const {name, total, percent, icon, img,bg} =props
    return (
        <>
            <div className="cart text-white  m-1 p-3 py-4" style={{backgroundColor:`${bg}`, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>

                <div className="row ">
                    <div className="col-8 lh-sm">
                        <span className='fw-normal fs-5'>{name}</span><br />
                        <span className='fw-bold fs-3'>{total}</span><br />
                        <span className='fw-light fs-6'>{percent}</span>

                    </div>
                    <div className="col-4 ">
                        <i className={`fa-solid ${icon} rounded-circle p-3 bg-white `} style={{color:`${bg}`}}></i>
                    </div>
                </div>
                <div className="row ">
                    <div className="col">
                        <img src={img} alt="..." style={{width: "100%", height:"100px"}} />
                    </div>
                </div>
            </div>
        </>
    )
}
