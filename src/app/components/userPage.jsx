import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
    const params = useParams();
    const { id } = params;
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    console.log(user);
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <h2>Встретился, раз: {user.completedMeetings}</h2>
                <h2>Оценка: {user.rate}</h2>
                <Link
                    to="/users"
                    className="btn btn-outline-primary"
                    role="button"
                >
                    Все пользователи
                </Link>
            </div>
        );
    }
    return "loading...";
};

UserPage.propTypes = {
    match: PropTypes.any
};

export default UserPage;
