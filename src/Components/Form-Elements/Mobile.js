import '../../Pages/CSS/Custom CSS/Mobile.css'

// export default function Mobile(props) {
export default function Mobile({ message = '',senderid='', serviceType = "SMS" }) {

  const getServiceButtonClass = (serviceType) => {
  switch (serviceType) {
    case "SMS":
      return "#07b6da"; // or create your own like 'btn-sms'
    case "RCS":
      return "rgb(238, 62, 62)"; // or 'btn-rcs'
    case "WABA":
      return "#2af173"; // or 'btn-waba'
      case "Voice":
        return "#FFD43B"
         case "Email":
          return "#ef4ff5";
    default:
      return "#07b6da";
  }
};


  return (
    <div className='mobile-div'>
      <div className='mobile-border-div'>
      </div>
      <div className='vol-div'></div>
      <div className='vol-down-div'></div>
      <div className='power-div'></div>

      <div className={`sender-div ${serviceType?.toLowerCase()}-active`} >
        <i class="fa-solid fa-angle-left " style={{ fontSize: "0.8rem", marginLeft: "0.6rem" }}></i>
        <i class="fa-solid fa-circle-user" style={{ fontSize: "1.8rem", marginLeft: "0.6rem", marginRight: "0.7rem", marginTop: "-0.15rem" }}></i>
        <span style={{ marginTop: "-0.15rem", marginRight: "2rem",minWidth:'4rem',fontWeight:"700" }}>{senderid}</span>
        <i class="fa-solid fa-video" style={{ marginRight: "1rem" }}></i>
        <i class="fa-solid fa-phone" style={{ marginRight: "1rem" }}></i>
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>

      <div className='msg-div'>
        <div class="imessage" >
          <p className={`from-me ${serviceType?.toLowerCase()}-msg`}>
            {message.length > 540 ? `${message.slice(0, 540)}...` : message}
          </p>
        </div>

      </div>

      <div className='submit-button'>
        <button className={`btn btn-glow`} type="button" style={{backgroundColor:`${getServiceButtonClass(serviceType)}`}} >
          Submit
        </button>
      </div>

    </div>


  );
}
