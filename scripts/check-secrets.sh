#!/bin/bash

echo "🔍 Escaneando posibles secretos en los ficheros a commitear..."

# Define las palabras clave a buscar
keywords=("apikey" "api_key" "secret" "token" "password" "firebase" "key")

# Obtenemos la lista de los ficheros en el staging area y le pasamos los nombres a grep.
# Esto asegura que solo se busquen en los ficheros que no están ignorados.
# He usado `git ls-files --cached` para asegurarnos que solo se analicen los archivos que están en el staging area.
grep_output=$(git ls-files --cached | xargs grep -iE "${keywords[@]}" 2>/dev/null)

if [ -z "$grep_output" ]; then
    echo "✅ No se encontraron posibles secretos en los ficheros a commitear."
    exit 0
else
    echo "⚠️ ¡Advertencia! Se detectaron posibles secretos en los siguientes ficheros:"
    echo "$grep_output"
    echo
    read -r -p "¿Quieres continuar con el commit de todas formas? (s/N): " confirm < /dev/tty
    if [[ "$confirm" == "s" || "$confirm" == "S" ]]; then
        echo "✅ Continuando con el commit..."
        exit 0
    else
        echo "❌ Commit cancelado. Revisa los archivos señalados."
        exit 1
    fi
fi
