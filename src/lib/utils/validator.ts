import { writable, type Writable } from "svelte/store"

interface Schema {
    hasError(value: unknown): boolean
}

export class Validator {
    hasError: boolean
    writable: Writable<Validator>
    fields: Record<string, Field>
    schemas: Record<string, Schema[]>
    fieldValues: Record<string, unknown> = {}
    fieldsCB: () => Record<string, unknown>
    constructor (fieldsCB: () => Record<string, unknown>, schemas: Record<string, Schema[]>){
        this.schemas = schemas
        this.fieldsCB = fieldsCB
        this.fields = {}
        this.hasError = false
        this.writable = writable(this)
        this.setFields()

        for(const fieldName in this.schemas){
            this.fields[fieldName] = new Field(
                fieldName,
                this.schemas[fieldName],
                this
            )
        }
    }

    setFields () {
        this.fieldValues = this.fieldsCB()
        this.update()
    }

    update(){
        this.writable.set(this)
    }

    touch(){
        this.setFields()
        let hasError = false
        for(const fieldName in this.fields) {
            const field = this.fields[fieldName]
            field.touch()
            if(field.hasError) hasError = true
        }
        this.hasError = hasError

        this.update()
    }

    subscribe(cb: (value: Validator) => void){
        return this.writable.subscribe(cb)
    }
}

export class Field {
    hasError: boolean
    validator: Validator
    name: string
    schema: Schema[]

    constructor(name: string, schema: Schema[] = [], validator: Validator){
        this.name = name
        this.schema = schema
        this.hasError = false
        this.validator = validator
    }

    get value(){
        return this.validator.fieldValues[this.name]
    }

    touch(){
        this.hasError = false //reset value
        this.validator.setFields()

        for(const i in this.schema){
            const schema = this.schema[i]

            if(schema.hasError(this.value)){
                this.hasError = true
                return // return because of error
            }
        }

        this.validator.update()
    }
}

export const required = {
    hasError(value: string | null | undefined){
        return [null, "", undefined].includes(value)
    }
}

export function min(minimum = 0) {
    return {
        hasError(value: unknown) {
            if(typeof value === "number"){
                return !(value >= minimum)
            }
            return true
        }
    }
}