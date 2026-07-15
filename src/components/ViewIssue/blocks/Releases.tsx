import { Title } from '@deskpro/app-sdk';
import { P5 } from '@deskpro/deskpro-ui';
import { ReleaseItem } from '../../ReleaseItem/ReleaseItem';
import { Release } from '../../../services/linear/types';

interface Releases {
    releases: Release[];
};

export function Releases({ releases }: Releases) {
    return (
        <>
            <Title title={`Releases (${releases.length})`} />
            {releases.length === 0
                ? <P5>No releases found</P5>
                : releases.map(release => <ReleaseItem key={release.id} release={release} />)
            }
        </>
    );
};
