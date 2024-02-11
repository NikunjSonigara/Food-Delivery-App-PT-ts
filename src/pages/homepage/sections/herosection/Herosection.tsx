import React from 'react'
import "./herosection.css"

const Herosection = () => {
    return (
        <div className="header" id="header">
            <header className="header_content">
                <section className="header_main_content">
                    <span className="header_title">NOODLETOWN</span>
                    <span className="header_desc">Discover best food around you</span>
                    <div className="header_searchbar">
                        <select name="place" id="place">
                            <option value="surat" selected>Surat</option>
                            <option value="ahemdabad">Ahemdabad</option>
                            <option value="vadodara">Vadodara</option>
                        </select>
                        <hr id="searchbar_hr" />
                        <div className="searchbar_right">
                            <label htmlFor="searchbar">
                                <img id="search_icon"
                                    src="https://th.bing.com/th/id/OIP.RF8hdNm5eOnLDpG_GSu5NwHaHN?rs=1&pid=ImgDetMain"
                                    alt="" />
                            </label>
                            <input type="text" id="searchbar" placeholder="Search for restaurant, cuisine, place" />
                        </div>
                    </div>
                </section>
            </header>
        </div>
    )
}

export default Herosection