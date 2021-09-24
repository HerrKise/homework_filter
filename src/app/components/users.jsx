import React, { useState, useEffect } from "react";
import SearchStatus from "./searchStatus";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import api from "../api";
import GroupList from "./groupList";
const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 2;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filtredUsers = selectedProf
        ? allUsers.filter((user) => user.profession._id === selectedProf._id)
        : allUsers;
    const count = filtredUsers.length;
    const usersCrop = paginate(filtredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {Promise.resolve(allUsers) === allUsers && <h6>Загрузка...</h6>}
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                {Promise.resolve(allUsers) !== allUsers && (
                    <SearchStatus length={count} />
                )}
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Провфессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {usersCrop.map((user) => (
                                <User {...rest} {...user} key={user._id} />
                            ))}
                        </tbody>
                    </table>
                )}
                {Promise.resolve(allUsers) !== allUsers && (
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Users;
