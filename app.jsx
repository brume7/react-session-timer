
class App extends React.Component{
    constructor(props){
        super(props);

        this.state={
            breakLength: 5,
            sessLength: 25,
            sessEnded: true,
            breakEnded: true,
            timerStart: false,
            timerPause: false,
            timeHeader: 'Session'
        }
        this.sessIncrease = this.sessIncrease.bind(this);
        this.sessDecrease = this.sessDecrease.bind(this);
        this.breakIncrease = this.breakIncrease.bind(this);
        this.breakDecrease = this.breakDecrease.bind(this);
        this.resetFn =this.resetFn.bind(this);
        this.timer = this.timer.bind(this);
        this.breakTimer = this.breakTimer.bind(this);
        this.secIncreaser = null;
        this.countDownTimerSess = null;
        this.stopSess = null;
        this.remaining = 0;
  
    }

    timer(){
        this.setState({
            timeHeader: 'Session'});
        clearInterval(this.countDownTimerSess);
        clearInterval(this.stopSess);
        let seconds = this.remaining;
        let minutes = 60 * this.state.sessLength;
        var timeleft = 0;
        let result ='';
        
        if(!this.state.timerStart && !this.state.timerPause ){
            this.setState({
                timeHeader: 'Session',
                sessEnded: false,
                breakEnded:false,
                timerStart: true
            });
            this.secIncreaser =setInterval(()=>{
                seconds++;
            this.remaining= seconds}, (1000));
            this.countDownTimerSess=setInterval(()=>{
            timeleft = minutes - seconds % minutes;
            result = parseInt(timeleft / 60) + ':' + timeleft % 60;
            document.getElementById('time-left').innerHTML = result;}, 500)
        }else if(this.state.timerStart){
            this.setState({
                sessEnded: true,
                breakEnded:true,
                timerStart: false,
                timerPause: true
            });
           
            console.log(this.remaining);
            clearInterval(this.secIncreaser);
            clearInterval(this.countDownTimerSess);
            
        }else if(!this.state.timerStart && this.state.timerPause ){
            this.setState({
                timeHeader: 'Session',
                sessEnded: false,
                breakEnded:false,
                timerStart: true,
                timerPause: false
            });
            seconds = this.remaining;
            this.secIncreaser =setInterval(()=>{
                seconds++;
            this.remaining= seconds}, (1000));
            this.countDownTimerSess=setInterval(()=>{
                timeleft = minutes - seconds % minutes;
                result = parseInt(timeleft / 60) + ':' + timeleft % 60;
                document.getElementById('time-left').innerHTML = result;}, 500)
        }

        this.stopSess =setInterval(()=>{
            if(this.remaining == minutes){
                clearInterval(this.secIncreaser);
                clearInterval(this.countDownTimerSess);
                clearInterval(this.stopSess);
                this.breakTimer();
                document.getElementById('beep').play();
            }
        },1000);
    }

    breakTimer (){
        this.setState({
            timerPause: false,
            timeHeader: 'Break',
            timerStart:false
        });
        let seconds = 0;
        let minutes = 60 * this.state.breakLength;
        var timeleft = 0;
        let result ='';

        console.log(this.state.timerStart);
        document.getElementById('start_stop').setAttribute('disabled', true);
        if( !this.state.timerPause ){
            this.setState({
                timeHeader: 'Break',
                sessEnded: false,
                breakEnded:false,
            });
            this.secIncreaser =setInterval(()=>{
                seconds++;
            this.remaining= seconds}, (1000));
            this.countDownTimerSess=setInterval(()=>{
            timeleft = minutes - seconds % minutes;
            result = parseInt(timeleft / 60) + ':' + timeleft % 60;
            document.getElementById('time-left').innerHTML = result;}, 500)
        }else if(this.state.timerStart){
            this.setState({
                sessEnded: true,
                breakEnded:true,
                timerStart: false,
                timerPause: true
            });
           
            console.log(this.remaining);
            clearInterval(this.secIncreaser);
            clearInterval(this.countDownTimerSess);
            
        }else if(!this.state.timerStart && this.state.timerPause ){
            this.setState({
                timeHeader: 'Break',
                sessEnded: false,
                breakEnded:false,
                timerPause: false
            });
            seconds = this.remaining;
            this.secIncreaser =setInterval(()=>{
                seconds++;
            this.remaining= seconds}, (1000));
            this.countDownTimerSess=setInterval(()=>{
                timeleft = minutes - seconds % minutes;
                result = parseInt(timeleft / 60) + ':' + timeleft % 60;
                document.getElementById('time-left').innerHTML = result;}, 500)
        }

        this.stopSess =setInterval(()=>{
            if(this.remaining == minutes){
                
                clearInterval(this.secIncreaser);
                clearInterval(this.countDownTimerSess);
                this.remaining = 0;
                clearInterval(this.stopSess);
        document.getElementById('start_stop').removeAttribute('disabled');
                this.timer();
                document.getElementById('beep').play();
            }
        },1000);
    }

    resetFn (){
        this.setState({
            timeHeader: 'Session',
            breakLength: 5,
            sessLength: 25,
            sessEnded: true,
            breakEnded: true,
            timerStart: false,
            timerPause: false,
        });
        
        clearInterval(this.secIncreaser);
        clearInterval(this.countDownTimerSess);
        clearInterval(this.stopSess);

        let minutes = 60 * 25;
        var timeleft = 0;
        let result ='';
            
            this.countDownTimerSess=setInterval(()=>{
                this.remaining = 0;
                timeleft = minutes - 0 % minutes;
                result = parseInt(timeleft / 60) + ':' + timeleft % 60;
                document.getElementById('time-left').innerHTML = result+'0';}, 50)


        
        
    }
    
    sessIncrease() {
        this.setState(state =>{
            if(state.sessLength <60 && state.sessEnded){
                clearInterval(this.secIncreaser);
        clearInterval(this.countDownTimerSess);

        let minutes = 60 * (state.sessLength+1);
        var timeleft = 0;
        let result ='';
            
            this.countDownTimerSess=setInterval(()=>{
                this.remaining = 0;
                timeleft = minutes - 0 % minutes;
                result = parseInt(timeleft / 60) + ':' + timeleft % 60;
                document.getElementById('time-left').innerHTML = result+'0';}, 50)
            return{
            sessLength: state.sessLength+1
        }
        
    }
    });
    }

    sessDecrease() {
        this.setState(state =>{
            if(state.sessLength >1 && state.sessEnded){
                clearInterval(this.secIncreaser);
        clearInterval(this.countDownTimerSess);

        let minutes = 60 * (state.sessLength-1);
        var timeleft = 0;
        let result ='';
            
            this.countDownTimerSess=setInterval(()=>{
                this.remaining = 0;
                timeleft = minutes - 0 % minutes;
                result = parseInt(timeleft / 60) + ':' + timeleft % 60;
                document.getElementById('time-left').innerHTML = result+'0';}, 50)
            return{
            sessLength: state.sessLength-1
        }}
    })
    }
    
    breakIncrease() {
        this.setState(state =>{
            if(state.breakLength <60 && state.breakEnded){
            return{
            breakLength: state.breakLength+1
        }}
    })
    }

    breakDecrease() {
        this.setState(state =>{
            if(state.breakLength > 1 && state.breakEnded){
            return{
            breakLength: state.breakLength-1
        }}
    })
    }

    render(){
        return (
            <div className="col-sm-7" id="main">
                <div className="row mb-1">
                    <h1 className="h1 text-light text-center">Session timer</h1>
                </div>
                <div className="row">
                    <div className="col">
                    <h3 className="h3 text-light text-center" id="break-label">Break Length</h3>
                    <div className="d-flex flex-row justify-content-center ">
                    <button onClick={this.breakDecrease} className="btn col-sm-2" id="break-decrement"><i className="fas fa-regular fa-arrow-down text-light text-center"></i></button>
                    <p className="col-sm-2 text-center text-light h4 p-2" id="break-length">{this.state.breakLength}</p>
                    <button onClick={this.breakIncrease} className="btn col-sm-2" id="break-increment"><i className="fas fa-regular fa-arrow-up text-light text-center"></i></button>
                    </div>
                    </div>
                    <div className="col">
                    <h3 className="h3 text-light text-center" id="session-label">Session Length</h3>
                    <div className="d-flex flex-row justify-content-center ">
                        <button onClick={this.sessDecrease} className="btn col-sm-2" id="session-decrement"><i className="fas fa-regular fa-arrow-down text-light text-center"></i></button>
                        <p className="col-sm-2 text-center text-light h4 p-2" id="session-length">{this.state.sessLength}</p>
                        <button onClick={this.sessIncrease} className="btn col-sm-2" id="session-increment"><i className="fas fa-regular fa-arrow-up text-light text-center"></i></button>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-4 border border-success rounded" >
                        <div className="row">
                        <h3 id="timer-label" className="text-light text-center h2">{this.state.timeHeader}</h3>
                        </div>
                        <div className="row">
                        <p id="time-left"  className="text-light text-center h3">{this.state.sessLength}:00</p>
                        <audio src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" id="beep"></audio>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                <button onClick={this.timer}  className="btn col-sm-2" id="start_stop"><i className="fas fa-light fa-play text-light text-center"></i></button>
                    <button onClick={this.resetFn}  className="btn col-sm-2" id="reset"><i className="fas fa-light fa-arrow-rotate-right text-light text-center"></i></button>
                </div>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App />
)