import React, { useState, useRef } from 'react';
import ReactPlayerWrapper from '../ReactPlayerWrapper';
import Fragments from './Fragments';

import FragmentPages from "./FragmentPages";

import './Player.css';

function Player({ fragments, pages, videoUrl, onDataUpdated }) {
    const [currentFragmentIdx, setCurrentFragmentIdx] = useState(-1);
    const [videoPlayerPosSecs, setVideoPlayerPosSecs] = useState(0);

    const $player = useRef(null);

    const handleFragmentSelected = (fragmentIdx) => {
        setCurrentFragmentIdx(fragmentIdx);
        $player.current.playFragment(fragments[fragmentIdx].startSec, fragments[fragmentIdx].endSec)
    };

    const handleOnPagesUpdated = (pages) => {
        onDataUpdated({ fragments, pages, videoUrl });
    }

    const onProgressUpdate = (playedSeconds) => {
        setVideoPlayerPosSecs(parseFloat(playedSeconds.toFixed(1)));
    };

    const getPrevFragmentEndSec = () => {
        if (currentFragmentIdx == 0) {
            return 0;
        }
        return fragments[currentFragmentIdx-1].endSec;
    }

    return (
            <div className='editor'>
                <div>
                    <ReactPlayerWrapper videoUrl={videoUrl} onProgressUpdate={onProgressUpdate} ref={$player} />

                    {currentFragmentIdx >= 0
                        ?
                        <div>
                            <FragmentPages
                                pages={pages || []}
                                fragmentPages={fragments[currentFragmentIdx].pages || []}
                                fragmentPageAreas={fragments[currentFragmentIdx].pageAreas || {}}
                            />
                        </div>
                        : ''
                    }

                </div>

                <Fragments fragments={fragments} onFragmentSelected={handleFragmentSelected}  />

            </div>
    );
}

export default Player;