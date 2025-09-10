import './App.css';
import React from 'react';
import MakePieChart from './Components/PieChart.js';
import Explain from './Components/Explain.js';
import InputFrom from './Components/InputForm.js';
import SalaryExplainPopup from './Popup/SalaryExplainPopup.js';

const healthInsuranceRate = 0.1; //健康保険料率
const pensionRate = 0.183; //年金保険料率
const careInsuranceRate = 0.016; //介護保険料率
let employmentInsuranceRate;   // 雇用保険料率（労働者負担）
let employmentInsuranceCompanyRate; // 雇用保険料率（会社負担）
const accidentInsuranceRate = 0.003;     // 労災保険料率（会社負担）

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[
        { name: '雇用保険料', value: 0 },
        { name: '健康保険料', value: 0 },
        { name: '年金', value: 0 },
        { name: '介護保険料', value: 0 },
        { name:'会社負担保険料',value: 0 },
        { name: '税金', value: 0 },
        { name: '手取り', value: 0 }
      ],
      chartKey:0,
      showSalaryPopup: false
    }
  }
  render(){

    //デバイスがPCかどうか
    const isPC = window.innerWidth > 1024;

    let MakeData = () =>{
      const salary = Number(document.querySelectorAll('.input-with-unit input')[0].value);
      const age = document.querySelectorAll('.form-group select')[1].value;
      const bonusAmount = Number(document.querySelectorAll('.input-with-unit input')[1].value);
      const bonusCount = Number(document.querySelectorAll('.input-with-unit input')[2].value);

      if(!checkValue(salary,age))return;

      const annualSalary = salary * 12;
      const annualBonus = bonusAmount * bonusCount;
      const totalIncome = annualSalary + annualBonus;

      // 社会保険料（労働者負担）
      const healthInsurance = Math.round(totalIncome * healthInsuranceRate / 2);
      const pension = Math.round(totalIncome * pensionRate / 2);
      const careInsurance = age === 'over40' ? Math.round(totalIncome * careInsuranceRate / 2) : 0;
      const employmentInsurance = Math.round(totalIncome * employmentInsuranceRate);

      // 社会保険料（会社負担）
      const companyHealth = healthInsurance;
      const companyPension = pension;
      const companyCare = careInsurance;
      const companyEmployment = Math.round(totalIncome * employmentInsuranceCompanyRate);
      const accidentInsurance = Math.round(totalIncome * accidentInsuranceRate);
      const companyBurden = companyHealth + companyPension + companyCare + companyEmployment + accidentInsurance;

      // 税金
      const tax = calcTax(totalIncome);

      // 手取り
      const takeHome = totalIncome - (healthInsurance + pension + careInsurance + employmentInsurance + tax);

      this.setState({data:[
        { name: '雇用保険料', value: employmentInsurance },
        { name: '健康保険料', value: healthInsurance },
        { name: '年金', value: pension },
        { name: '介護保険料', value: careInsurance },
        { name: '会社負担保険料', value: companyBurden },
        { name: '税金', value: tax },
        { name: '手取り', value: takeHome }
      ]});

      this.setState({chartKey:this.state.chartKey+1});

      //PCでない場合、計算後にページの一番下までスクロール
      if(!isPC){
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    }

    function checkValue(salary,age){
      let required;
      if(!(employmentInsuranceRate == null || employmentInsuranceCompanyRate == null || salary == 0 || age == ""))required = true;
      if(employmentInsuranceRate == null || employmentInsuranceCompanyRate == null){
        document.querySelectorAll('.form-group label span')[0].style.display = 'inline';
        required = false;
      }else{
        document.querySelectorAll('.form-group label span')[0].style.display = 'none';
      }
      if(salary === 0){
        document.querySelectorAll('.form-group label span')[1].style.display = 'inline';
        required = false;
      }else{
        document.querySelectorAll('.form-group label span')[1].style.display = 'none';
      }
      if(age === ""){
        document.querySelectorAll('.form-group label span')[2].style.display = 'inline';
        required = false;
      }else{
        document.querySelectorAll('.form-group label span')[2].style.display = 'none';
      }

      return required;
    }

    function calcTax(totalIncome) {
      
      totalIncome *= 10000;

      // 控除額
      const salaryDeduction = getSalaryDeduction(totalIncome);//給与所得控除
      const basicDeduction = 480000; // 基礎控除
      // 課税所得
      let taxableIncome = totalIncome - salaryDeduction - basicDeduction;
      if (taxableIncome < 0) taxableIncome = 0;
    
      const incomeTax = calcIncomeTax(taxableIncome);
    
      // 復興特別所得税
      const specialTax = incomeTax * 0.021;
    
      // 住民税（概算で一律10%）
      const residentTax = taxableIncome * 0.1;
    
      // 合計税額
      return Math.round((incomeTax + specialTax + residentTax) / 10000);
    }

    // 所得税（累進課税）
    function calcIncomeTax(amount) {
      if (amount <= 1000000) return amount * 0.05;
      if (amount <= 3000000) return amount * 0.1 - 97500;
      if (amount <= 6950000) return amount * 0.2 - 427500;
      if (amount <= 9000000) return amount * 0.23 - 636000;
      if (amount <= 18000000) return amount * 0.33 - 1536000;
      if (amount <= 40000000) return amount * 0.4 - 2796000;
      return amount * 0.45 - 4796000;
    }

    // 年間給与所得控除の計算（令和5年以降）
    function getSalaryDeduction(income) {
      if (income <= 1625000) return 550000;
      if (income <= 1800000) return income * 0.4 - 100000;
      if (income <= 3600000) return income * 0.3 + 80000;
      if (income <= 6600000) return income * 0.2 + 440000;
      if (income <= 8500000) return income * 0.1 + 1100000;
      return 1950000;
    }

    let setEmploymentInsuranceRate = () =>{
      const industry = document.querySelectorAll('.form-group select')[0].value;
      switch(industry){
        case "general":
          employmentInsuranceRate = 0.0055;
          employmentInsuranceCompanyRate = 0.009;
          break;
        case "agriSake":
          employmentInsuranceRate = 0.0065;
          employmentInsuranceCompanyRate = 0.01;
          break;        
        case "build":
          employmentInsuranceRate = 0.0065;
          employmentInsuranceCompanyRate = 0.011;
          break;
        default:
          employmentInsuranceRate = null;
          employmentInsuranceCompanyRate = null;
          break;
        }
    }

    const showSalartExplainPopup = () =>{
      this.setState({showSalaryPopup:true});
    }
    const closeSalartExplainPopup = () =>{
      this.setState({showSalaryPopup:false});
    }
    
    return(
      <div className="App">
          {
            isPC === true &&
            <div className="content-wrapper">
              <div className="explainAndPieChart-wrapper">
                <Explain/>
                <MakePieChart key={this.state.chartKey} data={this.state.data} />
              </div>
        
              <div className="inputForm-wrapper">
                <InputFrom MakeData={MakeData} setEmploymentInsuranceRate={setEmploymentInsuranceRate} 
                showSalartExplainPopup={showSalartExplainPopup}/>
              </div>
            </div>
          }
          {
            isPC === false &&
            <div className="content-wrapper-phone">
                <Explain/>
                <div className='inputForm-wrapper-phone'>
                  <InputFrom MakeData={MakeData} setEmploymentInsuranceRate={setEmploymentInsuranceRate}
                  showSalartExplainPopup={showSalartExplainPopup}/>
                </div>
                <MakePieChart key={this.state.chartKey} data={this.state.data} />
            </div>
          }
          {
            this.state.showSalaryPopup &&
            <SalaryExplainPopup closeSalartExplainPopup={closeSalartExplainPopup}/>
          }
      </div>
    )
  }
}
export default App;
