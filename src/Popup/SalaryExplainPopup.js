import React, { Component } from 'react';
import './SalaryExplainPopup.css';

class SalaryExplainPopup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='overlay' onClick={this.props.closeSalartExplainPopup}>
        <div className='popup' onClick={(e) => e.stopPropagation()}>
          <h1>標準月額報酬</h1>
          <p>
            <span>給料明細に記載されている標準月額報酬</span>を入力してください。
            標準月額報酬がわからない場合は<span>支給合計額</span>を入力してください。
          </p>

          <div className="payslip">
            <div className="payslip-header">
              <h2>給与明細（見本）</h2>
              <span>2025年9月度</span>
            </div>

            <div className="payslip-grid">
              {/* 支給 */}
              <div>
                <h3 className="section-title">支給</h3>
                <table>
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th className="right">金額 (円)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>基本給</td>
                      <td className="right">200,000</td>
                    </tr>
                    <tr className="highlight-row">
                      <td>標準月額報酬</td>
                      <td className="right">260,000</td>
                    </tr>
                    <tr>
                      <td>時間外手当</td>
                      <td className="right">25,000</td>
                    </tr>
                    <tr className="highlight-row">
                      <td>支給合計</td>
                      <td className="right">250,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 差引支給額 */}
            <table className="net">
              <tbody>
                <tr>
                  <td>差引支給額（手取り）</td>
                  <td className="right strong">209,000 円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="close-button" onClick={this.props.closeSalartExplainPopup}>閉じる</button>
        </div>
      </div>
    );
  }
}

export default SalaryExplainPopup;
