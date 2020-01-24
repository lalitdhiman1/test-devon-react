
import React, { Component } from 'react';
import DetailPage from './DetailPage/DetailPage'
import Datalist from '../components/Datalist'

class AppIndex extends Component {
    render() {

        return (
            <div className="container">
                <Datalist />
                <DetailPage />

            </div>
        )
    }
}


export default AppIndex