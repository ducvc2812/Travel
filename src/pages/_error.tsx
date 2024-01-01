import { type NextPage, type NextPageContext } from 'next';

interface Props {
    statusCode?: number
    errMessage?: string
}

const Error: NextPage<Props> = ({ statusCode, errMessage }) => {
    return (
        <>
            <p>
                {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
            </p>
            <p className='text-[#ff0000]'>{errMessage}</p>
        </>
    );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode, errMessage: err?.message };
};

export default Error;
