import './homePage.scss'
import '../../css/general.scss'

const noComp = "No compotion coming up. Check back soon for updates.";

const nextComp = "Next compotion is coming up on";


const NextComp = () =>{


    const temp = [<tr >
        <td>Alfreds Futterkiste</td> <td>0</td>
      </tr>];
    return(
        <div className='flex-center'>
            <div id='compotion'>
            <h2>{noComp}</h2>

            <table id='table'>
            <tr>
                <th>Username</th>
                <th>Score</th>
            </tr>
            {temp[0]}
            </table>
            
        </div>
        </div>
        

    )

}

export default NextComp;