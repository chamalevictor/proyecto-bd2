
-- PL\SQL

-- Alterar el fomato de fecha
ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD';
ALTER SESSION SET NLS_DATE_LANGUAGE = 'SPANISH';

-- Crear un usuario nuevo y asignar rol
CREATE
OR REPLACE PROCEDURE CREAR_USUARIO(
nombre_usuario VARCHAR2,
apellido_usuario VARCHAR2,
correo_usuario VARCHAR2,
rol_usuario NUMBER,
fecha_nac_usuario VARCHAR2,
token VARCHAR2,
msg OUT VARCHAR2,
exito OUT NUMBER)
AS
    usuario_existente EXCEPTION;
    nuevo_usuario
NUMBER;
BEGIN
SELECT COUNT(*)
INTO nuevo_usuario
FROM usuario
WHERE correo = correo_usuario;

-- Verificar si el usuario ya existe
IF
(nuevo_usuario = 1)
    THEN
        RAISE usuario_existente;

-- Si no existe, lo registra
ELSE
        INSERT INTO usuario
        VALUES (usuario_seq.nextval, nombre_usuario, apellido_usuario, correo_usuario, rol_usuario, 0, token, TO_DATE(fecha_nac_usuario, 'YYYY-MM-DD'));
commit;
msg := 'Se ha registrado el nuevo usuario con exito';
        exito := 1;
END IF;

EXCEPTION
    WHEN usuario_existente THEN
        msg := 'El usuario ya se encuentra registrado';
        exito:= 0;

WHEN OTHERS THEN
        msg := SQLERRM;
END;
/

-- Confirmar Usuario
CREATE OR REPLACE PROCEDURE CONFIRMAR_USUARIO(contrasena_usuario VARCHAR, token VARCHAR2, msg OUT VARCHAR2, exito OUT NUMBER)
AS
usuario_no_existe EXCEPTION;
usuario_existe NUMBER;

BEGIN
    SELECT COUNT(*) INTO usuario_existe FROM usuario WHERE contrasena = token;

    -- Verificar si el usuario existe
IF
(usuario_existe = 0)
    THEN
        RAISE usuario_no_existe;

-- Si existe existe, lo confirma
ELSE
        UPDATE USUARIO SET contrasena = contrasena_usuario, activo = 1 WHERE contrasena = token;
commit;
msg := 'Se ha confirmado la cuenta con exito';
        exito := 1;
END IF;

    EXCEPTION
    WHEN usuario_no_existe THEN
        msg := 'El usuario no se encuentra registrado';
        exito:= 0;

WHEN OTHERS THEN
        msg := 'Error: ' || SQLERRM;
                        
END;
/



-- Autenticar Usuario
CREATE OR REPLACE PROCEDURE AUTENTICAR_USUARIO(correo_usuario VARCHAR2, contrasena OUT VARCHAR2, usuario_consultado OUT usuario%ROWTYPE, msg OUT VARCHAR2, exito OUT NUMBER)
AS
    usuario_no_existe EXCEPTION;
    usuario_no_activo EXCEPTION;
    usuario_record usuario%ROWTYPE;

BEGIN

    SELECT * INTO usuario_record FROM usuario WHERE correo = correo_usuario;

 -- Verificar si el usuario esta activo

IF usuario_record.correo IS NULL THEN
        RAISE usuario_no_existe;
ELSIF
(usuario_record.activo = 0)
    THEN
        RAISE usuario_no_activo;

-- Si existe existe, devuelve el password
ELSE
        contrasena := usuario_record.contrasena;
        usuario_consultado := usuario_record;
        msg := 'Se ha autenticado con exito';
        exito := 1;
END IF;

    EXCEPTION
    WHEN usuario_no_activo THEN
            msg := 'La cuenta no se encuentra activa';
        exito:= 0;
    WHEN usuario_no_existe THEN
            msg := 'No existe una cuenta creada para este usuario';
        exito:= 0;
    WHEN NO_DATA_FOUND THEN
            msg := 'No existe una cuenta creada para este usuario';
        exito:= 0;
WHEN OTHERS THEN
        msg := 'Error: ' || SQLERRM;
END;
/

declare
msg VARCHAR2(100);
exito NUMBER;
contrasena VARCHAR2(100);
usuario_buscado usuario%ROWTYPE;

begin
    AUTENTICAR_USUARIO('victor.chamale@bancochinautla.com', contrasena, usuario_buscado, msg, exito);
    DBMS_OUTPUT.PUT_LINE(usuario_buscado.correo);
end;

select * from usuario;
update usuario set id_rol = 1 where id_usuario = 1;
commit;



CREATE OR REPLACE PROCEDURE PRUEBA(prueba_out OUT usuario%ROWTYPE)
AS
BEGIN
    SELECT * INTO prueba_out FROM usuario WHERE id_usuario = 1;
END;

declare
    otra_prueba usuario%rowtype;
begin
    prueba(otra_prueba);
    DBMS_OUTPUT.PUT_LINE(otra_prueba.nombre);
end;