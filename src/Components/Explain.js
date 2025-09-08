import React, { Component } from 'react';
import './Explain.css';


class Explain extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='explain'>
              <h1>〜社会保険料計算ツール〜</h1>
              <h2>社会保険料とは？</h2>
              <p>
                社会保険料は、健康保険・厚生年金・介護保険などを支えるために
                <span className='span'>毎月の給料から天引きされています。</span>
                さらに、
                <span className='span'>あなたが支払う額と同じ金額を会社も負担しています。<br/></span>
                このツールでは、地域や報酬、賞与などをもとに年間の社会保険料を簡単に計算でき、見える化できます。
              </p>
            </div>
        )
    }
}

export default Explain;