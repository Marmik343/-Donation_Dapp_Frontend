import { useState, useEffect } from "react";
const Memos = ({state}) => {

    const [memos, setMemos] = useState([]);
    const {contract} = state;


    useEffect(() => {
        const memosMessage = async() =>{
            const memos = await contract.getMemos();
            setMemos(memos);
        }
        contract && memosMessage();
    }, [contract])


return ( <>
<p>Messages</p>
{memos.map((memo) => {return(
    <table key={memo.timestamp}>
        <tbody>
            <tr>
                <td>{memo.name}</td>
                <td> </td>
                <td>{memo.message}</td>
                <td> </td>
                <td>{memo.from}</td>
                <td></td>
                <td>{String(memo.timestamp)}</td>
            </tr>
        </tbody>
    </table>
)})}

</>
);
}
export default Memos;