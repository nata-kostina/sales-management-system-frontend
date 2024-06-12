// @ts-nocheck
import { useState, useEffect } from "react";
import {
    GetCountries,
    GetState,
    GetCity,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Control, Controller } from "react-hook-form";
import { Select, Empty } from "antd";
import { ICustomerFormValues } from "../../../schemas/customer.form.schema";
import { PreloaderPortal } from "../Preloader/PreloaderPortal";
import { LocalPreloader } from "../Preloader/LocalPreloader";

interface Props {
    control: Control<ICustomerFormValues>;
    defaultValue?: {
        country: {
            id: number;
            name: string;
        };
        state: {
            id: number;
            name: string;
        };
        city: {
            id: number;
            name: string;
        };
    };
    error: {
        country?: string;
        state?: string;
        city?: string;
    };
}

export function CountryCitySelect({
    defaultValue,
    error,
    control,
}: Props): JSX.Element {
    const [isLoading, setIsLoading] = useState(true);
    const [isCountryLoading, setIsCountryLoading] = useState(true);
    const [isStateLoading, setIsStateLoading] = useState(true);
    const [isCityLoading, setIsCityLoading] = useState(true);
    const [countryId, setCountryId] = useState<number | null>(null);
    const [stateId, setStateId] = useState<number | null>(null);
    const [cityId, setCityId] = useState<number | null>(null);

    const [countriesList, setCountriesList] = useState<ICountry[]>([]);
    const [stateList, setStateList] = useState<IState[]>([]);
    const [cityList, setCityList] = useState<ICity[]>([]);

    useEffect(() => {
        setIsLoading(true);
        GetCountries().then((countries) => {
            setCountriesList(countries as ICountry[]);
            if (defaultValue) {
                setIsCountryLoading(false);
                GetState(defaultValue.country.id).then((states) => {
                    setStateList(states);
                    setIsStateLoading(false);
                    GetCity(defaultValue.country.id, defaultValue.state.id).then((cities) => {
                        setIsCityLoading(false);
                        setCityList(cities);
                        setCountryId(defaultValue.country.id);
                        setStateId(defaultValue.state.id);
                        setCityId(defaultValue.city.id);
                        setIsLoading(false);
                    });
                });
            } else {
                setIsLoading(false);
                setIsCountryLoading(false);
                setIsStateLoading(false);
                setIsCityLoading(false);
            }
        });
    }, []);

    return (
        <>
            {isLoading && <PreloaderPortal />}
            <div className="input-group input-group-country">
                <label htmlFor="country" className="label">Country</label>
                <div className="input-box">
                    <Controller<ICustomerFormValues>
                        control={control}
                        name="country"
                        defaultValue={defaultValue?.country ?? undefined}
                        render={({ field: { onChange: onControllerChange } }) => (
                            <Select
                                value={countryId}
                                placeholder="Select country"
                                options={countriesList.map((item) => ({ label: item.name, value: item.id }))}
                                onChange={(value) => {
                                    const country = countriesList.find((country) => country.id === value);
                                    if (country) {
                                        setCountryId(country.id);
                                        GetState(country.id).then((result) => {
                                            setStateList(result);
                                            setStateId(null);
                                            setCityId(null);
                                        });
                                        onControllerChange({
                                            id: country.id,
                                            name: country.name,
                                        });
                                    }
                                }}
                                showSearch={true}
                                optionFilterProp="children"
                                filterOption={(input: string, option?: { label: string; value: number; }) =>
                                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                                notFoundContent={isCountryLoading ? <LocalPreloader /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                            />
                        )}
                    />
                    {error.country && <p className="input-error">{error.country}</p>}
                </div>
            </div>
            <div className="input-group input-group-state">
                <label htmlFor="state" className="label">State</label>
                <div className="input-box">
                    <Controller<ICustomerFormValues>
                        control={control}
                        name="state"
                        defaultValue={defaultValue?.state ?? undefined}
                        render={({ field: { onChange: onControllerChange } }) => (
                            <Select
                                value={stateId}
                                placeholder="Select state"
                                options={stateList.map((item) => ({ label: item.name, value: item.id }))}
                                onChange={(value) => {
                                    const state = stateList.find((state) => state.id === value);
                                    if (state) {
                                        setStateId(state.id);
                                        GetCity(countryId, state.id).then((result) => {
                                            setCityList(result);
                                            setCityId(null);
                                        });
                                        onControllerChange({
                                            id: state.id,
                                            name: state.name,
                                        });
                                    }
                                }}
                                showSearch={true}
                                optionFilterProp="children"
                                filterOption={(input: string, option?: { label: string; value: number; }) =>
                                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                                notFoundContent={isStateLoading ? <LocalPreloader /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                            />
                        )}
                    />
                    {error.state && <p className="input-error">{error.state}</p>}
                </div>
            </div>

            <div className="input-group input-group-city">
                <label htmlFor="city" className="label">City</label>
                <div className="input-box">
                    <Controller<ICustomerFormValues>
                        control={control}
                        name="city"
                        defaultValue={defaultValue?.city ?? undefined}
                        render={({ field: { onChange: onControllerChange } }) => (
                            <Select
                                value={cityId}
                                placeholder="Select city"
                                options={cityList.map((item) => ({ label: item.name, value: item.id }))}
                                onChange={(value) => {
                                    const city = cityList.find((city) => city.id === value);
                                    if (city) {
                                        setCityId(city.id);
                                        onControllerChange({
                                            id: city.id,
                                            name: city.name,
                                        });
                                    }
                                }}
                                showSearch={true}
                                optionFilterProp="children"
                                filterOption={(input: string, option?: { label: string; value: number; }) =>
                                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                                notFoundContent={isCityLoading ? <LocalPreloader /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                            />
                        )}
                    />
                    {error.city && <p className="input-error">{error.city}</p>}
                </div>
            </div>
        </>
    );
}

type ICountry = {
    id: number;
    name: string;
};
type IState = ICountry;
type ICity = ICountry;
