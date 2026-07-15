import { ExternalIconLink } from '@deskpro/app-sdk';
import { P5 } from '@deskpro/deskpro-ui';
import { Release } from '../../services/linear/types';

interface ReleaseItem {
    release: Release;
};

export function ReleaseItem({ release }: ReleaseItem) {
    return (
        <>
            <P5 style={{ display: 'flex' }}>
                {`${release.name}${release.version ? ` (${release.version})` : ''} `}
                <ExternalIconLink href={release.url} />
            </P5>
            <P5>{`Stage: ${release.stage.name}`}</P5>
        </>
    );
};
