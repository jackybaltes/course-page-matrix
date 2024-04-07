import React, { ChangeEvent, FC, useState, Dispatch, SetStateAction } from 'react';
import styles from './course_selector.module.css';
import * as msdk from "matrix-js-sdk";
import Combobox from "react-widgets/Combobox";

interface ICourseSelectorProps {
    rooms: Array<msdk.Room>;
    selectedCourse: msdk.Room|null;
    setSelectedCourse: Dispatch<SetStateAction<msdk.Room|null>>;
};

const CourseSelector: FC<ICourseSelectorProps> = ({rooms, selectedCourse, setSelectedCourse}) => {
    const [mySelectedCourse, setMySelectedCourse] = useState<msdk.Room|null>(selectedCourse);

    console.log(`courseSelector selectedCourse ${selectedCourse?.roomId} ${selectedCourse?.name}`)
    interface HashTable<T> {
        [key: string]: T;
    }

    const lectureRooms = new Array<msdk.Room>();

    for( let r of rooms ) {
        if (r.name.indexOf(" - Lectures") >= 0) {
            lectureRooms.push(r);
        }
    }

    // const findRoom = (rooms: Array<msdk.Room>, id: string) => {
    //     let room = null;
    //     for(let r of rooms) {
    //         if (r.roomId == id) {
    //             room = r;
    //             break;
    //         }
    //     }   
    //     return room;
    // }

    const getCourseName = (room: msdk.Room) => {
        let cname = room.name;
        if ( room.name.substring(room.name.length - " - Lectures".length) == " - Lectures") {
            cname = room.name.substring(0,room.name.length - " - Lectures".length);
        }
        return cname;
    };

    const handleSelectCourseChange = (event:ChangeEvent<HTMLSelectElement>) => {
        const room = lectureRooms.find((room) => {
            return room.roomId == event.target.value;
        });
        (event.target as HTMLSelectElement).value = getCourseName(room!);
        setMySelectedCourse(room!);
        setSelectedCourse(room!);
    }
    
    //setSelectedCourse(null);

    let roomLink = "";
    
    if(mySelectedCourse) {
        const aliases = mySelectedCourse.getAltAliases();
        console.log(`CourseSelector room ${mySelectedCourse.roomId} find Aliases ${JSON.stringify(aliases)}`);
        roomLink = `<h3>Link to join room <a href=${mySelectedCourse.roomId}>${mySelectedCourse.name}</a></h3>`
    }

    // {mySelectedCourse ? getCourseName(mySelectedCourse):"Select Course..."}

    return (
        <>
            <select className={styles.courseSelectorSelect} value={getCourseName(mySelectedCourse!)} onChange={handleSelectCourseChange}>
            {
                lectureRooms.map((room) => {
                    let cname = getCourseName(room);
                    return (
                        <option key={room.roomId} value={room.roomId}>
                            {cname}
                        </option>
                    )
                })
            }
            </select>
            <div className={styles.courseRoomName}>
                {
                    roomLink
                }
            </div>
        </>
    );
}

export default CourseSelector;