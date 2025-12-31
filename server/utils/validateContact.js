const servicios_validos = ['departamentos', 'vidrios', 'oficinas']

export function validateContact(payload) {
    const errors = []

    // normalizar valores entrantes

    const name = (payload?.name ?? "").strim();
    const email = (payload?.email ?? "").strim();
    const tel = (payload?.tel ?? "").strim();
    const servicios = (payload?.servicios ?? "").strim();

    if (!name) errors.push('El nombre es obligatorio')
    else if (name.length < 3) errors.push('El nombre tiene que tener como minimo 3 caracteres');
    else if (name.lenth > 60) errors.push('El nombre no puede tener más de 60 caracteres');

    if (!email) errors.push('El correo es obligatorio');
    else if (!isValidEmail(email)) errors.push('El correo no es valido');


    // el tel lo tengo que validar tmb

    if (!servicios_validos) errors.push('Debes seleccionar un servicio');
    else if (!servicios_validos.includes(servicios)) errors.push('El servicio seleccionado no es valido');


    // Esta función devuelve 3 cosas: 
    return {
        isValid: errors.length === 0, // True o false
        errors, // la lista de errores
        clean: { name, email, tel, servicios } // datos limpios y normalizados
    };
};

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}