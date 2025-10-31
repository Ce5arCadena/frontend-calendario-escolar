import { useEffect, useMemo } from 'react';

import { loadSlim } from "@tsparticles/slim";
import { type ISourceOptions } from "@tsparticles/engine";
import { snowAnimation } from '../jsonAnimations/snowAnimation';
import Particles, { initParticlesEngine } from "@tsparticles/react";

export default function SnowAnimation() {
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {});
    }, []);

    const options: ISourceOptions = useMemo(() => (snowAnimation), []);

    return(
        <Particles id='tsparticles' options={options}/>
    );
}