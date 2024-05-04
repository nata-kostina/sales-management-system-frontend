import { App } from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";

export const useModalOperationResult = (): {
    modalSuccess: (title: string) => void;
    modalError: (title: string) => void;
    modalSelectItems: (selectedItems: string[],
        handleOk: (items?: string[]) => Promise<void>,
        btnText: string,
        title: string) => void;
    modalConfirm: (title: string, onSuccess: () => Promise<void>) => void;
} => {
    const { modal } = App.useApp();

    const modalSuccess = (title: string) => {
        modal.success({
            title: title,
            icon: <CheckCircleOutlined />,
            okText: "Ok",
            okType: "primary",
            cancelText: null,
            footer: (_, { OkBtn }) => {
                return <div style={{ marginLeft: "auto" }}><OkBtn /></div>;
            },
        });
    };

    const modalError = (title: string) => {
        modal.error({
            title: title,
            icon: <ExclamationCircleOutlined />,
            okText: "Ok",
            okType: "primary",
            cancelText: null,
            footer: (_, { OkBtn }) => {
                return <div style={{ marginLeft: "auto" }}><OkBtn /></div>;
            },
        });
    };

    const modalConfirm = (title: string, onSuccess: () => Promise<void>) => {
        modal.confirm({
            title: <span dangerouslySetInnerHTML={{ __html: title }} />,
            icon: <ExclamationCircleFilled />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                await onSuccess();
            },
        });
    };

    function modalSelectItems(
        selectedItems: string[],
        handleOk: (items?: string[]) => Promise<void>,
        btnText: string,
        title: string,
    ): void {
        const instance = modal.confirm({
            title,
            icon: <ExclamationCircleFilled />,
            footer: () => (
                <>
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-modal btn-default"
                            onClick={() => {
                                instance.destroy();
                                handleOk();
                            }}
                        >
                            <span className="btn__text">
                                {`${btnText} all`}
                            </span>
                        </button>
                        {selectedItems.length !== 0 && (
                            <button
                                type="button"
                                className="btn btn-modal btn-default"
                                onClick={() => {
                                    instance.destroy();
                                    handleOk(selectedItems.map((i) => i.toString()));
                                }}
                            >
                                <span className="btn__text">
                                    {`${btnText} selected (${selectedItems.length})`}
                                </span>
                            </button>
                        )}
                    </div>
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-modal btn-default"
                            onClick={() => instance.destroy()}
                        >
                            <span className="btn__text">
                                Cancel
                            </span>
                        </button>
                    </div>
                </>
            ),
        });
    }
    return { modalSuccess, modalError, modalSelectItems, modalConfirm };
};
