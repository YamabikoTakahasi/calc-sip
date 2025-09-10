import React, { Component } from 'react';
import './InputForm.css';
import Question from '../Images/Question.png';

class InputFrom extends Component{
    constructor(props){
        super(props);
        this.state = {
          showSalaryPopup: false,
        };
    }
    render(){
        return(
            <div className='inputForm'>
              <h2>社会保険料の計算</h2>
              <div className="form-group">
                <div className='form-title'>
                  <label>業種 <span>＊必須</span></label>
                </div>
                <select onChange={this.props.setEmploymentInsuranceRate}>
                  <option value="">ご選択ください</option>
                  <option value="general">一般</option>
                  <option value="agriSake">農林水産・清酒製造</option>
                  <option value="build">建設</option>
                </select>
              </div>

              <div className="form-group">
                <div className='form-title'>
                  <label>標準報酬月額／月額支給額 <span>＊必須</span></label>
                  <div onClick={this.props.showSalartExplainPopup}>
                    <img src={Question} width={window.innerWidth > 1024 ? 20 : 18} height={window.innerWidth > 1024 ? 20 : 18} alt="説明用アイコン"/>
                    {/* <label>標準報酬月額とは？</label> */}
                  </div>
                </div>
                <div className="input-with-unit">
                  <input type="number"/>
                  <span>万円</span>
                </div>
              </div>

              <div className="form-group">
                <div className='form-title'>
                  <label>年齢 <span>＊必須</span></label>
                </div>
                <select>
                  <option value="">ご選択ください</option>
                  <option value="under40">40歳未満</option>
                  <option value="over40">40歳以上</option>
                </select>
              </div>

              <div className="form-group">
                <label>賞与の金額</label>
                <div className="input-with-unit">
                  <input type="number" />
                  <span>万円</span>
                </div>
              </div>

              <div className="form-group">
                <label>賞与の回数</label>
                <div className="input-with-unit">
                  <input type="number" />
                  <span>回</span>
                </div>
              </div>
              <button className="calculate-button" onClick={this.props.MakeData}>計算する</button>
            </div>
        )
    }
}

export default InputFrom;