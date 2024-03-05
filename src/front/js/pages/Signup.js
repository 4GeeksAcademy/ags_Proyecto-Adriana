import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signUp.css";

export const SignUp = () => {
    const { actions, store } = useContext(Context);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        user_name: "",
        last_name: ""
    });
    const [alertMessage, setAlertMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password || !formData.user_name || !formData.last_name) {
            setAlertMessage("Todos los campos son obligatorios");
            return;
        }
        try {
            await actions.signUp(formData);
            setAlertMessage("Usuario creado correctamente");
            setFormData({
                email: "",
                password: "",
                user_name: "",
                last_name: ""
            });
        } catch (error) {
            if (error.message === "The email is already in use") {
                setAlertMessage("El correo electrónico ya está en uso");
            } else {
                setAlertMessage("Error al crear el usuario");
                console.error("Error al crear el usuario:", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5">
            <div className="mb-3">
                <label  className="form-label">Nombre</label>
                <input type="text" className="form-control" id="user_name" name="user_name" value={formData.user_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input type="text" className="form-control" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} autoComplete="current-user_name"/>
            </div>
            <div className="mb-3">
                <label  className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange}  autoComplete="current-password"/>
            </div>

            <button  type="submit" className="btn btn-primary">Registrarse</button>
            {alertMessage && (
                alertMessage === "Usuario creado correctamente" ? (
                    <div className="alert alert-success mt-3">{alertMessage}</div>
                ) : (
                    <div className="alert alert-danger mt-3">{alertMessage}</div>
                )
            )}
        </form>
    );
};
