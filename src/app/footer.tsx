import Link from "next/link";
import Image from "next/image";
import logo from '../images/ntnu logo 1.png';


export default function Footer() {
    return (
        <footer>
            <table>
                <tbody>
                    <tr>
                        <td className="logoImage"><Image src={logo} alt="NTNU Logo" className="logoImage" width="75"></Image></td>
                        <td>Educational Robotics Center, Dept. of Electrical Engineering, National Taiwan Normal University (NTNU), 10610 Taiwan</td>
                    </tr>
                </tbody>
            </table>
        </footer>
    )
}